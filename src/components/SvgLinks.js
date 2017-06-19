import {createElement} from 'react';

import {selectedColor} from '../constants';

const transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
const style = {transition};

export default function SvgLinks({lines = [], onClick, selected}) {
    const inlines = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const key = line.key;
        const [sP, eP] = line.line;
        const hD = (eP[0] - sP[0]) / 3;
        const d = `M${sP[0]},${sP[1]} C${eP[0] - hD},${sP[1]} ${sP[0] + hD},${eP[1]} ${eP[0]},${eP[1]}`;
        const isSelected = selected === key;
        const width = isSelected ? 2 : 1;

        inlines.push(
            <g key={key} stroke="black" fill="none" onClick={(event) => {
                event.stopPropagation();
                onClick(key);
            }}>
                <path d={d} stroke={isSelected ? selectedColor : 'black'} strokeWidth={width} style={style} />
                <path d={d} strokeWidth={10} strokeOpacity={0} />
            </g>
        );
    }
    return (
        <svg width="100%" height="100%" shapeRendering="geometricPrecision">
            {inlines}
        </svg>
    );
}
