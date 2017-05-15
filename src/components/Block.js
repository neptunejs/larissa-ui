import {createElement} from 'react';

import Paper from 'material-ui/Paper';

import StatusBar from './StatusBar';

const blockStyle = {
    width: 250,
    height: 150
};

export default function Block({definition, status}) {
    return (
        <Paper style={blockStyle}>
            <StatusBar status={status} />
        </Paper>
    );
}
