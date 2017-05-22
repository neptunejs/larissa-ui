import pipeline from '../larissa/pipeline';
import {CREATE_BLOCK, CREATE_BLOCK_WITH_CONNECTION, UPDATE_PIPELINE} from '../actions/index';

const defaultPipeline = stateFromPipeline(pipeline);

export default function (state = defaultPipeline, action) {
    switch (action.type) {
        case CREATE_BLOCK: {
            pipeline.newNode(action.payload.type);
            return stateFromPipeline(pipeline);
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
            return stateFromPipeline(pipeline);
        }
        case UPDATE_PIPELINE: {
            return stateFromPipeline(pipeline);
        }
        default: {
            return state;
        }
    }
}

function stateFromPipeline(pipeline) {
    const state = {
        nodes: {},
        graph: JSON.parse(pipeline.toJSON().graph)
    };

    for (let [id, vertex] of pipeline.graph.vertices()) {
        state.nodes[id] = vertex.inspect();
    }
    return state;
}
