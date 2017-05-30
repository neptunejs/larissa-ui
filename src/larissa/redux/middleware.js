import {
    CREATE_BLOCK,
    CREATE_BLOCK_WITH_CONNECTION,
    CREATE_PIPELINE, DELETE_NODE,
    RESET_PIPELINE,
    RUN_ERROR,
    RUN_PIPELINE,
    SET_BLOCK_OPTIONS,
    UPDATE_GRAPH,
} from './actions';

export const memoryMiddleware = env => store => {
    // Create root pipeline
    const rootPipeline = env.newPipeline();

    // Create dummy node on the pipeline
    const ten = rootPipeline.newNode('number', {value: 10});

    const pIn = env.newPipeline();
    const five = pIn.newNode('number', {value: 5});
    const prod = pIn.newNode('product');
    pIn.connect(five, prod);
    pIn.linkInput(prod.input(), 'number');
    pIn.linkOutput(prod.output(), 'result');

    rootPipeline.addNode(pIn);
    rootPipeline.connect(ten, pIn.input('number'));

    // Listen to status changes in the pipeline to dispatch actions
    rootPipeline.on('child-status', function () {
        store.dispatch(createUpdateGraphAction(rootPipeline));
    });

    rootPipeline.on('runError', function (err) {
        console.log(err);
        store.dispatch({
            type: RUN_ERROR,
            payload: {
                message: err.message
            }
        })
    });

    // Update on initialization
    store.dispatch(createUpdateGraphAction(rootPipeline));

    return next => action => {
        if (action.type.startsWith('@@larissa/')) {
            switch (action.type) {
                case CREATE_BLOCK: {
                    rootPipeline.newNode(action.payload.type);
                    return next(createUpdateGraphAction(rootPipeline));
                }
                case CREATE_BLOCK_WITH_CONNECTION: {
                    const nodeId = action.payload.node;
                    const newNode = rootPipeline.newNode(action.payload.type);
                    try {
                        const node = rootPipeline.getNode(nodeId);
                        if (node) {
                            if (action.payload.portType === 'input') {
                                rootPipeline.connect(newNode, node.input(action.payload.name));
                            }
                            if (action.payload.portType === 'output') {
                                rootPipeline.connect(node.output(action.payload.name), newNode);
                            }
                        }
                    } catch (e) {
                        // TODO: dispatch action to notify user of failure
                    }
                    return next(createUpdateGraphAction(rootPipeline));
                }
                case SET_BLOCK_OPTIONS: {
                    const node = rootPipeline.getNode(action.payload.id);
                    if (node.kind !== 'block') throw new Error('Setting options on not-a-block');
                    node.setOptions(action.payload.options);
                    // No need for dispatching. Listener will detect the reset of the Block
                    return null;
                }
                case RUN_PIPELINE: {
                    rootPipeline.run().catch((err) => {
                        next({
                            type: RUN_ERROR,
                            payload: {
                                message: err.message
                            }
                        });
                    });
                    return null;
                }
                case RESET_PIPELINE: {
                    rootPipeline.reset();
                    return null;
                }
                case CREATE_PIPELINE: {
                    const newPipeline = env.newPipeline();
                    rootPipeline.addNode(newPipeline);
                    return next(createUpdateGraphAction(rootPipeline));
                }
                case UPDATE_GRAPH: // Just pass the action to the end user
                case RUN_ERROR:
                    next(action);
                    return null;
                case DELETE_NODE:
                    rootPipeline.deleteNode(rootPipeline.getNode(action.payload));
                    next(action);
                    return next(createUpdateGraphAction(rootPipeline));
                default: {
                    throw new Error(`Unexpected action: ${action.type}`);
                }
            }
        }

        return next(action);
    };
};


function createUpdateGraphAction(pipeline) {
    return {
        type: UPDATE_GRAPH,
        payload: stateFromPipeline(pipeline)
    };
}

function stateFromPipeline(pipeline) {
    const state = {
        nodes: {},
        graph: JSON.parse(pipeline.graph.toJSON())
    };

    for (let [id, vertex] of pipeline.graph.vertices()) {
        state.nodes[id] = vertex.toJSON();
    }
    return state;
}
