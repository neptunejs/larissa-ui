import {createElement} from 'react';
import {List, ListItem, Subheader} from 'material-ui';

const NodeList = props => {
    const tree = props.tree;
    function renderTree(tree) {
        if(!tree) return null;
        return (
            <ListItem key={tree.label} primaryText={tree.label} nestedItems={tree.children ? tree.children.map(renderTree) : []}/>
        )
    }

    return (
        <List>
            <Subheader>List of nodes</Subheader>
            {tree.map(renderTree)}
        </List>
    );
};

export default NodeList;