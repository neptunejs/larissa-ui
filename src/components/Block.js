import {createElement} from 'react';

import Paper from 'material-ui/Paper';

import Ports from './Ports';
import StatusBar from './StatusBar';

const blockWidth = 250;
const blockHeight = 150;

const blockStyle = {
    width: blockWidth,
    height: blockHeight,
    position: 'relative'
};

export default function Block({definition, status}) {
    return (
        <Paper style={blockStyle}>
            <StatusBar status={status} />
            <Ports type="input" value={definition.inputs} width={blockWidth} height={blockHeight} />
            <Ports type="output" value={definition.outputs} width={blockWidth} height={blockHeight} />
            <div style={{padding: 5}}>
                <h4 style={{marginTop: 0}}>{definition.label || definition.name}</h4>
            </div>
        </Paper>
    );
}
