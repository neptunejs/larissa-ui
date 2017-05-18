import {createElement} from 'react';
import {List, Subheader} from 'material-ui';
import {NodeTree} from './ListNode';

const NodeList = props => {
    const tree = props.tree;
    return (
        <List>
            <Subheader>List of nodes</Subheader>
            <NodeTree tree={tree} />
        </List>
    );
};

export default NodeList;
