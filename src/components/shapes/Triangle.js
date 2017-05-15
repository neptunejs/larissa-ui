import {createElement} from 'react';

export default function Triangle({direction = 'right', size = 15, color = 'black'}) {
    const demiSize = size / 2;
    const transparentStyle = `${demiSize}px solid transparent`;
    const colorStyle = `${size}px solid ${color}`;
    const style = {
        width: 0,
        height: 0
    };
    switch (direction) {
        case 'right':
            style.borderTop = transparentStyle;
            style.borderBottom = transparentStyle;
            style.borderLeft = colorStyle;
            break;
        case 'bottom':
            style.borderLeft = transparentStyle;
            style.borderRight = transparentStyle;
            style.borderTop = colorStyle;
            break;
        case 'left':
            style.borderTop = transparentStyle;
            style.borderBottom = transparentStyle;
            style.borderRight = colorStyle;
            break;
        case 'top':
            style.borderLeft = transparentStyle;
            style.borderRight = transparentStyle;
            style.borderBottom = colorStyle;
            break;
    }
    return <div style={style} />;
}
