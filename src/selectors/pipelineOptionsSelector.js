import {createSelector} from 'reselect';

const nodesSelector = (state) => state.pipeline.nodes;
const currentNodeSelector = (_, props) => props.node;

export default createSelector(
    nodesSelector,
    currentNodeSelector,
    (nodes, node) => {
        const inputCandidates = [];
        const outputCandidates = [];
        const inputs = [];
        const outputs = [];
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

        for (const input of node.node.inputs) {
            inputs.push(getPort(input, nodes));
        }

        for (const output of node.node.outputs) {
            outputs.push(getPort(output, nodes));
        }

        return {
            inputs,
            outputs,
            inputCandidates,
            outputCandidates
        };
    }
);

function getPort(port, nodes) {
    return {
        name: port.name,
        id: port.id,
        link: {
            id: port.link.id,
            node: nodes[port.link.id].node,
            name: port.link.name
        }
    };
}
