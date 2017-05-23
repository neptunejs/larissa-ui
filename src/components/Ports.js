import {createElement} from 'react';
import {DropTarget} from 'react-dnd';

import Triangle from './shapes/Triangle';
import Square from './shapes/Square';

import {portSize, ItemTypes} from '../constants';
import evenSeparation from '../util/evenSeparation';
import {connect} from 'react-redux';
import {createBlockWithConnection} from '../larissa/redux';

export default function Ports({type, value = [], width, height, node}) {
    if (value.length === 0) return null;
    const style = {
        position: 'absolute'
    };
    if (type === 'input') style.left = -portSize;
    else if (type === 'output') style.left = width;

    const separation = evenSeparation(value.length, portSize, height);
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
                <PortConnection node={node} name={port.name} type={type}>
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

function PortElement({children, dropTarget, isOver}) {
    const style = {};
    if (isOver) {
        style.backgroundColor = 'red';
    }
    return dropTarget(<div style={style}>
        {children}
    </div>);
}

function collect(connect, monitor) {
    return {
        dropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

const spec = {
    drop(props, monitor) {
        const item = monitor.getItem();
        props.createBlockWithConnection({
            node: props.node,
            type: item.type,
            portName: props.name,
            portType: props.type
        });
    }
};

const PortConnection = connect(null, {createBlockWithConnection})(DropTarget([ItemTypes.BLOCK_NODE], spec, collect)(PortElement));
