import {createElement} from 'react';

export default function SvgLines({lines}) {
    const inlines = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        inlines.push(
            <line key={i} x1={line[0][0]} y1={line[0][1]} x2={line[1][0]} y2={line[1][1]} stroke="black" strokeWidth={1} />
        );
    }
    return (
        <svg width="100%" height="100%" shapeRendering="geometricPrecision">
            {inlines}
        </svg>
    );
}
