import {createElement} from 'react';

import Triangle from './shapes/Triangle';
import Square from './shapes/Square';

import {portSize} from '../constants';
import evenSeparation from '../util/evenSeparation';

export default function Ports({type, value = [], width, height}) {
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
                <Component />
            </div>
        );
    }

    return (
        <div style={style}>
            {ports}
        </div>
    );
}
