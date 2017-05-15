import {createElement} from 'react';

import LinearProgress from 'material-ui/LinearProgress';
import {
    yellow500,
    red500,
    lightGreenA100,
    lightGreenA400 as doneGreen
} from 'material-ui/styles/colors';

export default function StatusBar({status}) {
    let mode = 'determinate';
    let value = 100;
    let color;

    switch (status) {
        case 'init':
            color = yellow500;
            break;
        case 'error':
            color = red500;
            break;
        case 'ready':
            color = lightGreenA100;
            break;
        case 'done':
            color = doneGreen;
            break;
        case 'running':
            color = doneGreen;
            mode = 'indeterminate';
            break;
        default:
            color = doneGreen;
            value = parseInt(status);
            break;
    }
    return <LinearProgress mode={mode} value={value} color={color} />;
}
