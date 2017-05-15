import {createElement} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import NodeListDrawer from './NodeListDrawer';

import AppBar from 'material-ui/AppBar';

import Block from './Block';

const testDefinition = {
    name: 'testnode',
    label: 'My test node',
    inputs: [
        {name: 'input1'},
        {name: 'input2', multiple: true},
        {name: 'input3'}
    ],
    outputs: [
        {name: 'output1'},
        {name: 'output2'}
    ],
    options: null
};

const testDefinition2 = {
    name: 'test2',
    outputs: [
        {name: 'output'}
    ]
};

export default function () {
    return (
        <MuiThemeProvider>
            <div>
                <AppBar title="larissa" />
                <NodeListDrawer />
                <div>
                    <div style={{position: 'relative'}}>
                        <div style={{position: 'absolute', top: 150, left: 450}}>
                            <Block status="error" definition={testDefinition} /><br />
                            <Block status="running" definition={testDefinition2} />
                        </div>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    );
}
