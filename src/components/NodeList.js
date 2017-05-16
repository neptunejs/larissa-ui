import {createElement, Component} from 'react';
import {List, ListItem, Subheader} from 'material-ui';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
import {ItemTypes} from '../constants';

const nodeSource = {
    beginDrag(props) {
        return {
            label: props.label
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
}

class LeafNode extends Component {
    render() {
        const {isDragging, connectDragSource, label} = this.props;
        return connectDragSource(
            <div>
                <ListItem
                    style={{opacity: isDragging ? 0.5 : 1}}
                    primaryText={label}
                />
            </div>
        );
    }

    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true
        });
    }
}

const LeafNodeDraggable = DragSource(ItemTypes.BLOCK_NODE, nodeSource, collect)(LeafNode);

const NodeList = props => {
    const tree = props.tree;

    function renderTree(tree) {
        if (!tree) return null;
        if (tree.children && tree.children.length) {
            return renderParentItem(tree);
        } else {
            return (
                <LeafNodeDraggable key={tree.label} label={tree.label} />
            );
        }


        function renderParentItem(tree) {
            return (
                <ListItem
                    key={tree.label}
                    primaryText={tree.label}
                    nestedItems={tree.children.map(renderTree)}
                    primaryTogglesNestedList={true}
                />
            );
        }


    }

    return (
        <List>
            <Subheader>List of nodes</Subheader>
            {tree.map(renderTree)}
        </List>
    );
};

export default NodeList;
