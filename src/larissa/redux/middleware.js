import {
    CREATE_BLOCK,
    CREATE_BLOCK_WITH_CONNECTION,
    RESET_PIPELINE,
    RUN_ERROR,
    RUN_PIPELINE,
    SET_BLOCK_OPTIONS,
    UPDATE_GRAPH,
} from './actions';

export const memoryMiddleware = env => store => {
    // Create root pipeline
    const pipeline = env.newPipeline();

    // Create dummy node on the pipeline
    pipeline.newNode('number', {value: 5});

    // Listen to status changes in the pipeline to dispatch actions
    pipeline.on('child-status', function () {
        store.dispatch(createUpdateGraphAction(pipeline));
    });

    // Update on initialization
    store.dispatch(createUpdateGraphAction(pipeline));

    return next => action => {
        if (action.type.startsWith('@@larissa/')) {
            switch (action.type) {
                case CREATE_BLOCK: {
                    pipeline.newNode(action.payload.type);
                    return next(createUpdateGraphAction(pipeline));
                }
                case CREATE_BLOCK_WITH_CONNECTION: {
                    const nodeId = action.payload.node;
                    const newNode = pipeline.newNode(action.payload.type);
                    try {
                        const node = pipeline.getNode(nodeId);
                        if (node) {
                            if (action.payload.portType === 'input') {
                                pipeline.connect(newNode, node.input(action.payload.name));
                            }
                            if (action.payload.portType === 'output') {
                                pipeline.connect(node.output(action.payload.name), newNode);
                            }
                        }
                    } catch (e) {
                        // TODO: dispatch action to notify user of failure
                    }
                    return next(createUpdateGraphAction(pipeline));
                }
                case SET_BLOCK_OPTIONS: {
                    const node = pipeline.getNode(action.payload.id);
                    if (node.kind !== 'block') throw new Error('Setting options on not-a-block');
                    node.setOptions(action.payload.options);
                    // No need for dispatching. Listener will detect the reset of the Block
                    return null;
                }
                case RUN_PIPELINE: {
                    pipeline.run().catch((err) => {
                        console.error(err);
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
                    pipeline.reset();
                    return null;
                }
                case UPDATE_GRAPH: // Just pass the action to the end user
                    next(action);
                    return null;
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
