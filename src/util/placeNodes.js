import Graph from 'graph.js/dist/graph.es6';
/*
Implement the Coffman–Graham algorithm (https://en.wikipedia.org/wiki/Coffman%E2%80%93Graham_algorithm)
 */
const limit = 5;
export default function placeNodes(pipeline) {
    const graph = Graph.fromJSON(JSON.stringify(pipeline.graph));
    // step 1
    const reduced = graph.transitiveReduction();
    // step 2
    const topological = Array.from(reduced.vertices_topologically()).filter(([x]) => x.length === 36);
    // step 3
    topological.reverse();
    const nodes = new Map();
    const levels = new Map();
    let totalLevels = 1;
    for (const [nodeId] of topological) {
        let maxLevel = 1;
        const outputs = [];
        for (const [vertexId] of graph.vertices()) {
            if (vertexId.length > 36 && vertexId.startsWith(nodeId + '_output')) {
                outputs.push(vertexId);
            }
        }
        for (const output of outputs) {
            const connectedInputs = Array.from(reduced.verticesFrom(output));
            for (const [inputId] of connectedInputs) {
                if (nodes.has(inputId.substring(0, 36))) {
                    maxLevel = Math.max(maxLevel, nodes.get(inputId.substring(0, 36)) + 1);
                }
            }
        }
        while (true) {
            const levelCount = levels.get(maxLevel);
            if (!levelCount || levelCount < limit) {
                break;
            }
            maxLevel++;
        }
        nodes.set(nodeId, maxLevel);
        const level = levels.get(maxLevel);
        levels.set(maxLevel, level ? level + 1 : 1);
        if (maxLevel > totalLevels) totalLevels = maxLevel;
    }
    return {
        nodes,
        levels,
        totalLevels
    };
}
