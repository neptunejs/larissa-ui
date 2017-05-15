import {createElement} from 'react';

import Paper from 'material-ui/Paper';

import StatusBar from './StatusBar';
import Triangle from './shapes/Triangle';
import Rectangle from './shapes/Rectangle';

const blockWidth = 250;

const blockStyle = {
    width: blockWidth,
    height: 150,
    position: 'relative'
};

const inputs = {
    position: 'absolute',
    left: -15
};

const outputs = {
    position: 'absolute',
    left: blockWidth
};

export default function Block({definition, status}) {
    return (
        <Paper style={blockStyle}>
            <StatusBar status={status} />
            <div style={inputs}>
                <Triangle direction="right" size={15} /><br />
                <Rectangle size={15} />
            </div>
            <div style={outputs}>
                <Triangle direction="right" size={15} /><br />
                <Rectangle size={15} />
            </div>
        </Paper>
    );
}
