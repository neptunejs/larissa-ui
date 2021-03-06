/*
Implement the Coffman–Graham algorithm (https://en.wikipedia.org/wiki/Coffman%E2%80%93Graham_algorithm)
 */
import Graph from 'graph.js/dist/graph';

import getSubgraphs from './getSubgraphs';

const limit = 5;
export default function placeNodes(pipeline) {
    if (!pipeline) return null;
    const graph = Graph.fromJSON(JSON.stringify(pipeline));
    const subgraphs = getSubgraphs(graph);
    return subgraphs.map(getNodesPlacement);
}

function getNodesPlacement(graph) {
    // step 1
    const reduced = graph.transitiveReduction();
    // step 2
    const topological = Array.from(reduced.vertices_topologically());
    // step 3
    topological.reverse();
    const nodes = new Map();
    const levels = new Map();
    let totalLevels = 1;
    for (const [nodeId, node] of topological) {
        let maxLevel = 1;
        const connected = [];
        for (const [connectedId,, connections] of graph.verticesFrom(nodeId)) {
            connected.push({
                node: connectedId,
                connections: connections.map(c => c.split(':').map(c => c.split('_')[2]))
            });
            if (nodes.has(connectedId)) {
                maxLevel = Math.max(maxLevel, nodes.get(connectedId).level + 1);
            }
        }
        while (true) {
            const levelCount = levels.get(maxLevel);
            if (!levelCount || levelCount < limit) {
                break;
            }
            maxLevel++;
        }
        nodes.set(nodeId, {level: maxLevel, connected, node});
        const level = levels.get(maxLevel);
        levels.set(maxLevel, level ? level + 1 : 1);
        if (maxLevel > totalLevels) totalLevels = maxLevel;
    }
    let maxWidth = 0;
    for (const width of levels.values()) {
        if (width > maxWidth) maxWidth = width;
    }
    return {
        nodes,
        levels,
        totalLevels,
        maxWidth
    };
}
