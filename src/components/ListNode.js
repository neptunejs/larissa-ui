import {createElement, Component} from 'react';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
import {ItemTypes} from '../constants';
import {ListItem} from 'material-ui';
import {setRootPipelineFromJson} from '../larissa/redux';
import {connect} from 'react-redux';

const nodeSource = {
    beginDrag(props) {
        return {
            type: props.block.identifier,
            label: props.block.label,
            block: props.block
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

@connect(null, {setRootPipelineFromJson})
class LeafNode extends Component {
    render() {
        const {isDragging, connectDragSource, block} = this.props;
        return connectDragSource(
            <div>
                <ListItem
                    style={{opacity: isDragging ? 0.5 : 1}}
                    primaryText={block.label}
                    onDoubleClick={() => {
                        if (this.props.block.kind === 'pipeline') {
                            this.props.setRootPipelineFromJson(this.props.block.value);
                        }
                    }}
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
            initiallyOpen={tree.label === 'builtin'}
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
