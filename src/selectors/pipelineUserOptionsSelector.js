import {createSelector} from 'reselect';

const currentNodeSelector = (state) => state.pipeline.nodes[state.pipelineUI.selectedNode || state.pipelineUI.currentPipeline];
// const pipelineOptionsSelector = (state) => state.pipelineUI.pipelineOptions;
const nodesSelector = (state) => state.pipeline.nodes;

export default createSelector(
    currentNodeSelector,
    nodesSelector,
    (node, nodes) => {
        const options = node.node.linkedOptions.map(option => ({
            title: option[0],
            schema: option[1].schema,
            node: {
                id: nodes[option[1].node].node.id,
                options: getOptions(nodes[option[1].node].node, nodes)
            }
        }));

        return {
            options
        };
    }
);

function getOptions(node, nodes) {
    if (node.kind === 'block') {
        return node.options;
    } else {
        const linkedOptions = node.linkedOptions;
        if (!linkedOptions) return {};
        const options = {};
        linkedOptions.forEach(linkedOption => {
            options[linkedOption[0]] = getOptions(nodes[linkedOption[1].node].node);
        });
        return options;
    }
}
