import {createElement} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

import Block from './Block';

const testDefinition = {
    name: 'testnode',
    label: 'My test node',
    inputs: [
        {name: 'input1'},
        {name: 'input2'},
        {name: 'input3'}
    ],
    outputs: [
        {name: 'output1'},
        {name: 'output2'}
    ],
    options: null
};

export default function () {
    return (
        <MuiThemeProvider>
            <div>
                <AppBar title="larissa" />
                <div>
                    <div style={{position: 'relative'}}>
                        <div style={{position: 'absolute', top: 150, left: 450}}>
                            <Block status="error" definition={testDefinition} />
                        </div>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    );
}
