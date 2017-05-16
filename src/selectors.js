import {createSelector} from 'reselect';
import {groupBy, map} from 'lodash-es';
const nodes = state => state.nodes;

export const nodesToTree = createSelector([nodes], nodes => {
    const groups = groupBy(nodes, node => node.plugin || 'builtin');
    return map(groups, group => ({
        children: group,
        label: group[0].plugin || 'builtin'
    }));
});
