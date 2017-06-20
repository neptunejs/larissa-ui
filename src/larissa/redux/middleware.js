import {
    CREATE_BLOCK,
    CREATE_BLOCK_WITH_CONNECTION,
    CREATE_CONNECTION,
    CREATE_PIPELINE,
    CREATE_PIPELINE_FROM_JSON,
    DELETE_NODE,
    DELETE_LINK,
    DUMP_JSON,
    INSPECT_NODE,
    LINK_INPUT,
    LINK_OUTPUT,
    NODE_CHANGED,
    CONNECTION_ERROR,
    RESET_NODE,
    RESET_PIPELINE,
    RUN_ERROR,
    RUN_NODE,
    RUN_PIPELINE,
    SET_CURRENT_PIPELINE,
    SET_BLOCK_OPTIONS,
    SET_NODE_TITLE,
    UPDATE_GRAPH,
    UPDATE_NODE,
    UPDATE_NODES,
    UPDATE_NODES_AND_GRAPH,
    setCurrentPipeline,
    nodeChanged
} from './actions';

import predefinedPipelines from '../predefinedPipelines';

export const memoryMiddleware = env => store => {
    // Create root pipeline
    const rootPipeline = env.newPipeline();
    rootPipeline.setTitle('ROOT');
    let currentPipeline = rootPipeline;

    // Add demos
    for (const pipeline of predefinedPipelines) {
        if (pipeline.preload) {
            const newPipeline = env.pipelineFromJSON(pipeline.value);
            rootPipeline.addNode(newPipeline);
        }
    }

    {
        const ten = rootPipeline.newNode('number', {value: 10});
        const pIn = env.pipelineFromJSON({kind: 'pipeline', id: '7f741154-df9f-4f2d-a802-f0f651e28e4f', inputs: [{id: '7f741154-df9f-4f2d-a802-f0f651e28e4f_input_number', name: 'number', multiple: false, required: false, link: {id: '457f37f6-bd43-4582-b556-aa086d4d82e1', name: 'value'}}], outputs: [{id: '7f741154-df9f-4f2d-a802-f0f651e28e4f_output_result', name: 'result', link: {id: '457f37f6-bd43-4582-b556-aa086d4d82e1', name: 'product'}}], graph: '[["845f215a-89dd-48a5-ba94-edf96945db24",{"kind":"block","id":"845f215a-89dd-48a5-ba94-edf96945db24","type":"number","options":{"value":5},"title":"number"}],["457f37f6-bd43-4582-b556-aa086d4d82e1",{"kind":"block","id":"457f37f6-bd43-4582-b556-aa086d4d82e1","type":"product","options":{},"title":"product"}],[["845f215a-89dd-48a5-ba94-edf96945db24","457f37f6-bd43-4582-b556-aa086d4d82e1"],["845f215a-89dd-48a5-ba94-edf96945db24_output_number:457f37f6-bd43-4582-b556-aa086d4d82e1_input_value"]]]', title: 'Pipeline'});
        rootPipeline.addNode(pIn);
        rootPipeline.connect(ten, pIn.input('number'));
        const id = rootPipeline.newNode('identity');
        rootPipeline.connect(pIn.output('result'), id);
    }

    let ignoreEvents = false;
    const setIgnoreEvents = () => ignoreEvents = true;
    const unsetIgnoreEvents = () => ignoreEvents = false;

    // Listen to status changes in the pipeline to dispatch actions
    rootPipeline.on('deep-child-change', node => {
        store.dispatch(nodeChanged(node));
        if (ignoreEvents) return;
        store.dispatch(createUpdateNodeAction(node));
    });

    rootPipeline.on('change', () => {
        store.dispatch(nodeChanged(rootPipeline));
        if (ignoreEvents) return;
        store.dispatch(createUpdateNodeAction(rootPipeline));
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
                    console.log(JSON.stringify(currentPipeline)); // eslint-disable-line no-console
                    return null;
                }
                case CREATE_BLOCK: {
                    setIgnoreEvents();
                    currentPipeline.newNode(action.payload.type);
                    unsetIgnoreEvents();
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case CREATE_BLOCK_WITH_CONNECTION: {
                    setIgnoreEvents();
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
                    unsetIgnoreEvents();
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
                    setIgnoreEvents();
                    const newPipeline = env.newPipeline();
                    currentPipeline.addNode(newPipeline);
                    unsetIgnoreEvents();
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case CREATE_PIPELINE_FROM_JSON: {
                    setIgnoreEvents();
                    const newPipeline = env.pipelineFromJSON(action.payload);
                    currentPipeline.addNode(newPipeline);
                    unsetIgnoreEvents();
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case DELETE_NODE: {
                    setIgnoreEvents();
                    currentPipeline.deleteNode(currentPipeline.getNode(action.payload));
                    unsetIgnoreEvents();
                    next(action);
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case DELETE_LINK: {
                    setIgnoreEvents();
                    const split = action.payload.split('_');
                    currentPipeline.disconnect(
                        currentPipeline.findNode(split[0]).output(split[2]),
                        currentPipeline.findNode(split[1]).input(split[3])
                    );
                    unsetIgnoreEvents();
                    next(action);
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
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
                    setIgnoreEvents();
                    const pipeline = currentPipeline.getNode(action.payload.id);
                    const nodeId = action.payload.input.node.id;
                    const inputPort = action.payload.input.port;
                    const linkName = action.payload.name;
                    const node = pipeline.getNode(nodeId);
                    pipeline.linkInput(node.input(inputPort), linkName);
                    unsetIgnoreEvents();
                    return dispatchUpdateNodesAndGraphAction(currentPipeline, next);
                }
                case LINK_OUTPUT: {
                    setIgnoreEvents();
                    const pipeline = currentPipeline.getNode(action.payload.id);
                    const nodeId = action.payload.output.node.id;
                    const outputPort = action.payload.output.port;
                    const linkName = action.payload.name;
                    const node = pipeline.getNode(nodeId);
                    pipeline.linkOutput(node.output(outputPort), linkName);
                    unsetIgnoreEvents();
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
                        setIgnoreEvents();
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
                    } finally {
                        unsetIgnoreEvents();
                    }
                }
                case RUN_NODE:
                    currentPipeline.runNode(action.payload);
                    return next(createUpdateGraphAction(currentPipeline));
                case RESET_NODE: {
                    const node = currentPipeline.getNode(action.payload);
                    node.reset();
                    return next(createUpdateGraphAction(currentPipeline));
                }
                case UPDATE_GRAPH: // Just pass the action to the end user
                case UPDATE_NODES:
                case UPDATE_NODE:
                case RUN_ERROR:
                    next(action);
                    return null;
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

function createUpdateNodeAction(node) {
    return {
        type: UPDATE_NODE,
        payload: {
            id: node.id,
            value: node.inspect()
        }
    };
}
