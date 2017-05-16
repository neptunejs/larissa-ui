import {createElement, Component} from 'react';
import {List, ListItem, Subheader} from 'material-ui';
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
