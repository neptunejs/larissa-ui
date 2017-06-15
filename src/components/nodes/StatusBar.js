import {createElement} from 'react';

import {INSTANTIATED, ERRORED, FINISHED, RUNNING, READY} from '../../constants';

import LinearProgress from 'material-ui/LinearProgress';
import {
    yellow500,
    red500,
    lightGreenA400 as doneGreen,
    orange500
} from 'material-ui/styles/colors';

export default function StatusBar({status}) {
    let mode = 'determinate';
    let value = 100;
    let color;

    if (typeof status === 'number') {
        color = doneGreen;
        value = parseInt(status);
    } else {
        switch (status) {
            case INSTANTIATED:
                color = orange500;
                break;
            case READY:
                color = yellow500;
                break;
            case ERRORED:
                color = red500;
                break;
            case FINISHED:
                color = doneGreen;
                break;
            case RUNNING:
                color = doneGreen;
                mode = 'indeterminate';
                break;
            default:
                color = 'black';
                break;
        }
    }

    return <LinearProgress mode={mode} value={value} color={color} />;
}
