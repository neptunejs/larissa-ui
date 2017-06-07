import {createElement, Component} from 'react';
import {DropTarget, DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';
import {connect} from 'react-redux';

import {blockWidth, blockHeight, portSize, ItemTypes} from '../../constants';
import portSeparation from '../../util/portSeparation';
import {createBlockWithConnection, createConnection} from '../../larissa/redux/index';

import Triangle from '../shapes/Triangle';
import Square from '../shapes/Square';

export default function Ports({type, value = [], node}) {
    if (value.length === 0) return null;
    const style = {
        position: 'absolute'
    };
    if (type === 'input') style.left = -portSize;
    else if (type === 'output') style.left = blockWidth;

    const separation = portSeparation(value.length, portSize, blockHeight);
    const ports = [];
    for (let i = 0; i < value.length; i++) {
        const port = value[i];
        let Component = port.multiple ? Square : Triangle;
        const pos = {
            position: 'absolute',
            top: separation[i]
        };
        ports.push(
            <div key={i} style={pos}>
                <PortConnection node={node} name={port.name} type={type} valType={port.type}>
                    <Component />
                </PortConnection>
            </div>
        );
    }

    return (
        <div style={style}>
            {ports}
        </div>
    );
}

function dropCollect(connect, monitor) {
    return {
        dropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

const dropSpec = {
    drop(props, monitor) {
        const item = monitor.getItem();
        switch (monitor.getItemType()) {
            case ItemTypes.BLOCK_NODE:
                props.createBlockWithConnection({
                    node: props.node,
                    type: item.type,
                    portName: props.name,
                    portType: props.type
                });
                break;
            case ItemTypes.NODE_PORT:
                if (props.type !== item.type) {
                    let source = props;
                    let dest = item;
                    if (source.type === 'input') {
                        [source, dest] = [dest, source];
                    }
                    props.createConnection({
                        source: getRelevantProps(source),
                        dest: getRelevantProps(dest)
                    });
                }
                break;
            default:
                throw new Error('Unexpected item type when handling drop event');
        }
    }
};

function getRelevantProps(props) {
    return {
        node: props.node,
        type: props.type,
        name: props.name,
        valType: props.valType
    };
}

const portSource = {
    beginDrag(props) {
        return getRelevantProps(props);
    }
};

function dragCollect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    };
}

@connect(null, {createBlockWithConnection, createConnection})
@DropTarget([ItemTypes.BLOCK_NODE, ItemTypes.NODE_PORT], dropSpec, dropCollect)
@DragSource(ItemTypes.NODE_PORT, portSource, dragCollect)
class PortConnection extends Component {
    render() {
        const {children, dropTarget, isOver} = this.props;
        const {connectDragSource} = this.props;
        const style = {};
        if (isOver) {
            style.backgroundColor = 'red';
        }
        return connectDragSource(dropTarget(<div style={style}>
            {children}
        </div>));
    }

    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage(), {
            captureDraggingState: true
        });
    }
}

