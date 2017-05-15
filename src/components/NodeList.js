import {createElement} from 'react';
import {List, ListItem, Subheader} from 'material-ui';
const pluginList = [];

const NodeList = props => {
    const tree = props.tree;

    function renderTree(tree) {
        return (
            <ListItem key={tree.label} primaryText={tree.label}/>
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