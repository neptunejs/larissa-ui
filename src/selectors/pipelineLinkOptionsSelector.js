import {createSelector} from 'reselect';

const currentNodeSelector = (state) => state.pipeline.nodes[state.pipelineUI.selectedNode || state.pipelineUI.currentPipeline];

export default createSelector(
    currentNodeSelector,
    (node) => {
        return {
            graph: JSON.parse(node.node.graph)
        };
    }
);
