import {createElement} from 'react';
import {List, Subheader} from 'material-ui';
import {NodeTree} from './ListNode';

const NodeList = (props) => {
    console.log(props);
    const tree = props.tree;
    return (
        <List>
            <Subheader>List of nodes</Subheader>
            <NodeTree tree={tree} />
            <Subheader>Predefined pipelines</Subheader>
            <NodeTree tree={props.pipelines} />
        </List>
    );
};

export default NodeList;
