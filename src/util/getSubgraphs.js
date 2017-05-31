export default function getSubgraphs(graph) {
    const nodeIds = new Map();
    const visited = new Set();
    let currentId = 1;
    const sources = graph.sources();
    for (const [source] of sources) {
        if (visited.has(source)) continue;
        visit(source);
        currentId++;
    }

    function visit(node) {
        if (visited.has(node)) return;
        visited.add(node);
        nodeIds.set(node, currentId);
        for (const [other] of graph.verticesFrom(node)) {
            visit(other);
        }
        for (const [other] of graph.verticesTo(node)) {
            visit(other);
        }
    }

    const subgraphs = [];
    for (let id = 1; id < currentId; id++) {
        const subgraph = graph.clone();
        subgraphs.push(subgraph);
        for (const [node, nodeId] of nodeIds) {
            if (nodeId !== id) {
                subgraph.destroyExistingVertex(node);
            }
        }
    }
    return subgraphs;
}
