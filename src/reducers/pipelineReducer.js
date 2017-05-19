import pipeline from '../larissa/pipeline';
import {CREATE_BLOCK} from '../actions/index';

const defaultPipeline = stateFromPipeline(pipeline);

export default function (state = defaultPipeline, action) {
    switch (action.type) {
        case CREATE_BLOCK:
            pipeline.newNode(action.payload.type);
            return stateFromPipeline(pipeline);
        default:
            return state;
    }
}

function stateFromPipeline(pipeline) {
    const state = {
        nodes: {},
        graph: JSON.parse(pipeline.toJSON().graph)
    };

    for (let [id, vertex] of pipeline.graph.vertices()) {
        state.nodes[id] = {
            type: vertex.blockType.name,
            kind: 'block',
            status: vertex.status
        };
    }
    return state;
}