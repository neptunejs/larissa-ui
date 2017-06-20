import {createSelector} from 'reselect';

const nodesSelector = (state) => state.pipeline.nodes;
const currentNodeSelector = (_, props) => props.node;

export default createSelector(
    nodesSelector,
    currentNodeSelector,
    (nodes, node) => {
        const inputCandidates = [];
        const outputCandidates = [];
        for (const inputCandidate of node.inputCandidates) {
            inputCandidates.push({
                id: `${nodes[inputCandidate.node].node.id}_input_${inputCandidate.port}`,
                node: nodes[inputCandidate.node].node,
                direction: 'input',
                port: inputCandidate.port
            });
        }
        for (const outputCandidate of node.outputCandidates) {
            outputCandidates.push({
                id: `${nodes[outputCandidate.node].node.id}_output_${outputCandidate.port}`,
                node: nodes[outputCandidate.node].node,
                direction: 'output',
                port: outputCandidate.port
            });
        }
        return {
            inputCandidates,
            outputCandidates
        };
    }
)
