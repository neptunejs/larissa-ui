import {createElement, Component} from 'react';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
import {ItemTypes} from '../constants';
import {ListItem} from 'material-ui';
import env from '../environment';

const nodeSource = {
    beginDrag(props) {
        return {
            block: env.getBlock(props.block.identifier),
            label: props.block.label
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    };
}

class LeafNode extends Component {
    render() {
        const {isDragging, connectDragSource, block} = this.props;
        return connectDragSource(
            <div>
                <ListItem
                    style={{opacity: isDragging ? 0.5 : 1}}
                    primaryText={block.label}
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

export const LeafListNodeDraggable = DragSource(ItemTypes.BLOCK_NODE, nodeSource, collect)(LeafNode);

export const ParentListNode = props => {
    const tree = props.tree;
    return (
        <ListItem
            key={tree.label}
            primaryText={tree.label}
            nestedItems={tree.children.map(renderTree)}
            primaryTogglesNestedList={true}
        />
    );
};

function renderTree(tree) {
    if (!tree) return null;
    if (tree.children && tree.children.length) {
        return <ParentListNode key={tree.label} tree={tree} />;
    } else {
        return <LeafListNodeDraggable key={tree.label} label={tree.label} block={tree} />;
    }
}

export const NodeTree = props => {
    const tree = props.tree;
    return (
        <div>
            {tree.map(renderTree)}
        </div>
    );
};

