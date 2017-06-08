import {
    CREATE_BLOCK,
    CREATE_BLOCK_WITH_CONNECTION,
    CREATE_CONNECTION,
    CREATE_PIPELINE,
    CREATE_PIPELINE_FROM_JSON,
    DELETE_NODE,
    DUMP_JSON,
    INSPECT_NODE,
    LINK_INPUT,
    LINK_OUTPUT,
    NODE_CHANGED,
    CONNECTION_ERROR,
    RESET_PIPELINE,
    RUN_ERROR,
    RUN_NODE,
    RUN_PIPELINE,
    SET_CURRENT_PIPELINE,
    SET_BLOCK_OPTIONS,
    SET_NODE_TITLE,
    UPDATE_GRAPH,
    UPDATE_NODES,
    UPDATE_NODES_AND_GRAPH,
    setCurrentPipeline,
    nodeChanged
} from './actions';

export const memoryMiddleware = env => store => {
    // Create root pipeline
    const rootPipeline = env.newPipeline();
    rootPipeline.setTitle('ROOT');
    let currentPipeline = rootPipeline;

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
    rootPipeline.on('child-change', () => {
        store.dispatch(createUpdateNodesAction(rootPipeline));
    });

    rootPipeline.on('deep-child-change', node => {
        store.dispatch(nodeChanged(node));
    });

    rootPipeline.on('change', () => {
        store.dispatch(nodeChanged(rootPipeline));
    });

    rootPipeline.on('runError', function (err) {
        console.log(err); // eslint-disable-line no-console
        store.dispatch({
            type: RUN_ERROR,
            payload: {
                message: err.message
            }
        });
    });

    // Update on initialization
    store.dispatch(createUpdateNodesAction(rootPipeline));
    store.dispatch(createUpdateGraphAction(rootPipeline));
    store.dispatch(setCurrentPipeline(rootPipeline.toJSON()));

    return next => action => {
        if (action.type.startsWith('@@larissa/')) {
            switch (action.type) {
                case DUMP_JSON: {
                    console.log(JSON.stringify(currentPipeline));
                    return null;
                }
                case CREATE_BLOCK: {
                    currentPipeline.newNode(action.payload.type);
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case CREATE_BLOCK_WITH_CONNECTION: {
                    const nodeId = action.payload.node;
                    const newNode = currentPipeline.newNode(action.payload.type);
                    try {
                        const node = currentPipeline.getNode(nodeId);
                        if (node) {
                            if (action.payload.portType === 'input') {
                                currentPipeline.connect(newNode, node.input(action.payload.portName));
                            }
                            if (action.payload.portType === 'output') {
                                currentPipeline.connect(node.output(action.payload.portName), newNode);
                            }
                        }
                    } catch (e) {
                        currentPipeline.deleteNode(newNode);
                        return next({
                            type: CONNECTION_ERROR,
                            payload: e.message
                        });
                    }
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case SET_BLOCK_OPTIONS: {
                    const node = currentPipeline.getNode(action.payload.id);
                    if (node.kind !== 'block') throw new Error('Setting options on not-a-block');
                    node.setOptions(action.payload.options);
                    // No need for dispatching. Listener will detect the reset of the Block
                    return null;
                }
                case RUN_PIPELINE: {
                    currentPipeline.run().catch((err) => {
                        console.error(err); // eslint-disable-line no-console
                        next({
                            type: RUN_ERROR,
                            payload: {
                                message: err.message
                            }
                        });
                    });
                    break;
                }
                case RESET_PIPELINE: {
                    currentPipeline.reset();
                    return null;
                }
                case CREATE_PIPELINE: {
                    const newPipeline = env.newPipeline();
                    currentPipeline.addNode(newPipeline);
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case CREATE_PIPELINE_FROM_JSON: {
                    const newPipeline = env.pipelineFromJSON(action.payload);
                    currentPipeline.addNode(newPipeline);
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case UPDATE_GRAPH: // Just pass the action to the end user
                case UPDATE_NODES:
                case RUN_ERROR:
                    next(action);
                    return null;
                case DELETE_NODE:
                    currentPipeline.deleteNode(currentPipeline.getNode(action.payload));
                    next(action);
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                case SET_CURRENT_PIPELINE: {
                    const newCurrentPipeline = rootPipeline.findNode(action.payload.id);
                    if (!newCurrentPipeline) {
                        throw new Error(`Pipeline with id ${action.payload.id} was not found`);
                    }
                    if (newCurrentPipeline.kind !== 'pipeline') {
                        throw new Error('Setting pipeline to be not-a-pipeline');
                    }
                    currentPipeline = newCurrentPipeline;
                    next(action);
                    return next(createUpdateGraphAction(currentPipeline));
                }
                case LINK_INPUT: {
                    const pipeline = currentPipeline.getNode(action.payload.id);
                    const nodeId = action.payload.input.node.id;
                    const inputName = action.payload.input.info.name;
                    const linkName = action.payload.name;
                    const node = pipeline.getNode(nodeId);
                    pipeline.linkInput(node.input(inputName), linkName);
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case LINK_OUTPUT: {
                    const pipeline = currentPipeline.getNode(action.payload.id);
                    const nodeId = action.payload.output.node.id;
                    const outputName = action.payload.output.info.name;
                    const linkName = action.payload.name;
                    const node = pipeline.getNode(nodeId);
                    pipeline.linkOutput(node.output(outputName), linkName);
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case INSPECT_NODE: {
                    const node = currentPipeline.findNode(action.payload);
                    if (!node) {
                        throw new Error(`Node with id ${action.payload} was not found for inspection`);
                    }
                    action.payload = node.inspect();
                    next(action);
                    return null;
                }
                case NODE_CHANGED: {
                    action.payload = action.payload.inspect();
                    next(action);
                    return null;
                }
                case SET_NODE_TITLE: {
                    const node = rootPipeline.findNode(action.payload.id);
                    if (!node) throw new Error(`Node with id ${action.payload.id} was not found for setting its title`);
                    node.setTitle(action.payload.value);
                    return null;
                }
                case CREATE_CONNECTION: {
                    const source = action.payload.source;
                    const dest = action.payload.dest;
                    const sourceNode = currentPipeline.getNode(source.node);
                    const destNode = currentPipeline.getNode(dest.node);
                    if (!sourceNode) {
                        throw new Error(`Source node with id ${source.node} was not found to create a connection`);
                    }
                    if (!destNode) {
                        throw new Error(`Destination node with id ${source.node} was not found to create a connection`);
                    }
                    try {
                        currentPipeline.connect(sourceNode.output(source.name), destNode.input(dest.name));
                        return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                    } catch (e) {
                        let message = e.message;
                        if (message.includes('cycle')) {
                            message = 'Cycles are not allowed';
                        }
                        return next({
                            type: CONNECTION_ERROR,
                            payload: message
                        });
                    }
                }
                case RUN_NODE:
                    currentPipeline.runNode(action.payload);
                    return next(createUpdateGraphAction(currentPipeline));
                default: {
                    throw new Error(`Unexpected action: ${action.type}`);
                }
            }
        }
        return next(action);
    };

    function dispatchUpdateNodesAndGraphAction(pipeline, next) {
        next({
            type: UPDATE_NODES_AND_GRAPH,
            payload: {
                nodes: createUpdateNodesAction(rootPipeline).payload,
                graph: createUpdateGraphAction(pipeline).payload
            }
        });
    }
};

function createUpdateGraphAction(pipeline) {
    return {
        type: UPDATE_GRAPH,
        payload: JSON.parse(pipeline.graph.toJSON())
    };
}

function createUpdateNodesAction(pipeline) {
    const nodes = {};
    for (const node of pipeline.nodes()) {
        nodes[node.id] = node.inspect();
    }
    return {
        type: UPDATE_NODES,
        payload: nodes
    };
}
