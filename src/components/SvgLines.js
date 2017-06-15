import {createElement} from 'react';

export default function SvgLines({lines = []}) {
    const inlines = [];
    for (let i = 0; i < lines.length; i++) {
        const [sP, eP] = lines[i];
        const hD = (eP[0] - sP[0]) / 3;
        inlines.push(
            <path key={i} d={`M${sP[0]},${sP[1]} C${eP[0] - hD},${sP[1]} ${sP[0] + hD},${eP[1]} ${eP[0]},${eP[1]}`} stroke="black" fill="none" style={{transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'}} />
        );
    }
    return (
        <svg width="100%" height="100%" shapeRendering="geometricPrecision">
            {inlines}
        </svg>
    );
}
