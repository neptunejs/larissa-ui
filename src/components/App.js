import {createElement} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

import Block from './Block';

export default function () {
    return (
        <MuiThemeProvider>
            <div>
                <AppBar title="larissa" />
                <div>
                    <div style={{position: 'relative'}}>
                        <div style={{position: 'absolute', top: 150, left: 450}}>
                            <Block progress="error" />
                        </div>
                    </div>
                </div>
            </div>
        </MuiThemeProvider>
    );
}
