import {createElement} from 'react';

import Triangle from './shapes/Triangle';
import Square from './shapes/Square';

import {portSize} from '../constants';

export default function Ports({type, value = [], width, height}) {
    if (value.length === 0) return null;
    const style = {
        position: 'absolute'
    };
    if (type === 'input') style.left = -portSize;
    else if (type === 'output') style.left = width;

    const nElements = value.length;
    const totalHeight = portSize * nElements;
    const step = (height - totalHeight) / (nElements + 1);

    const ports = [];
    let currentStep = step;
    for (let i = 0; i < nElements; i++) {
        const port = value[i];
        let Component = port.multiple ? Square : Triangle;
        const pos = {
            position: 'absolute',
            top: currentStep
        };
        ports.push(
            <div key={i} style={pos}>
                <Component />
            </div>
        );
        currentStep += step + portSize;
    }

    return (
        <div style={style}>
            {ports}
        </div>
    );
}
