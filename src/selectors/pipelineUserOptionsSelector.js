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
            node: nodes[option[1].node].node
        }));

        return {
            options
        };
    }
);
