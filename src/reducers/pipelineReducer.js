import pipeline from '../larissa/pipeline';
window.pipeline = pipeline;

const defaultPipeline = {
    nodes: {},
    graph: JSON.parse(pipeline.toJSON().graph)
};

for (let [id, vertex] of pipeline.graph.vertices()) {
    defaultPipeline.nodes[id] = {
        type: vertex.blockType.name,
        kind: 'block',
        status: vertex.status
    };
}

export default function (state = defaultPipeline) {
    return state;
}
