import env from '../environment';
import {
    CREATE_BLOCK,
    UPDATE_GRAPH,
    CREATE_BLOCK_WITH_CONNECTION,
    RUN_PIPELINE,
    RESET_PIPELINE
} from './actions';
export const memoryMiddleware = pipeline => store => {
    // Listen to status changes in the pipeline to dispatch actions
    pipeline.on('child-status', function () {
        store.dispatch({
            type: UPDATE_GRAPH,
            payload: stateFromPipeline(pipeline)
        });
    });

    // Update on initialization
    store.dispatch({
        type: UPDATE_GRAPH,
        payload: stateFromPipeline(pipeline)
    });

    return next => action => {
        if (action.type.startsWith('@@larissa/')) {
            switch (action.type) {
                case CREATE_BLOCK: {
                    pipeline.newNode(action.payload.type);
                    const nextAction = {
                        type: UPDATE_GRAPH,
                        payload: stateFromPipeline(pipeline)
                    };
                    return next(nextAction);
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
                    return next({
                        type: UPDATE_GRAPH,
                        payload: stateFromPipeline(pipeline)
                    });
                }
                case RUN_PIPELINE: {
                    pipeline.run();
                    return null;
                }
                case RESET_PIPELINE: {
                    pipeline.reset();
                    return null;
                }
                default: {
                    return next(action);
                }
            }
        }

        return next(action);
    };
};

export function newPipeline() {
    const pipeline = env.newPipeline();
    pipeline.newNode('number', {value: 5});
    return pipeline;
}

function stateFromPipeline(pipeline) {
    const state = {
        nodes: {},
        graph: JSON.parse(pipeline.graph.toJSON())
    };

    for (let [id, vertex] of pipeline.graph.vertices()) {
        state.nodes[id] = vertex.inspect();
    }
    return state;
}