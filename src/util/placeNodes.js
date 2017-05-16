/*
Implement the Coffman–Graham algorithm (https://en.wikipedia.org/wiki/Coffman%E2%80%93Graham_algorithm)
 */
const limit = 5;
export default function placeNodes(pipeline) {
    const graph = pipeline.graph;
    // step 1
    const reduced = graph.transitiveReduction();
    // step 2
    const topological = Array.from(reduced.vertices_topologically()).filter(([x]) => x.length === 36).map(([,y]) => y);
    // step 3
    topological.reverse();
    const nodes = new Map();
    const levels = new Map();
    for (const node of topological) {
        let maxLevel = 1;
        for (const output of node.outputs.values()) {
            const connectedInputs = Array.from(reduced.verticesFrom(output.id));
            for (const [input] of connectedInputs) {
                if (nodes.has(input.substring(0, 36))) {
                    maxLevel = Math.max(maxLevel, nodes.get(input.substring(0, 36)) + 1);
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
        nodes.set(node.id, maxLevel);
        const level = levels.get(maxLevel);
        levels.set(maxLevel, level ? level + 1 : 1);
    }
    return nodes;
}
