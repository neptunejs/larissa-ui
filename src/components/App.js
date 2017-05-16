import {createElement} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NodeListDrawer from './NodeListDrawer';

import AppBar from 'material-ui/AppBar';

import Block from './Block';
import SvgLines from './SvgLines';

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
    inputs: [
        {name: 'input'}
    ]
};

export default function () {
    return (
        <MuiThemeProvider>
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <AppBar title="larissa" />
                <NodeListDrawer />
                <div style={{flex: 0.99}}>
                    <div style={{position: 'relative', height: '100%'}}>
                        <SvgLines lines={[[[612, 202], [735, 227]]]} />
                        <Block status="error" definition={testDefinition} style={{top: 150, left: 350}} />
                        <Block status="running" definition={testDefinition2} style={{position: 'absolute', top: 150, left: 750}} />
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    );
}
