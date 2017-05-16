import {createElement} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NodeListDrawer from './NodeListDrawer';

import AppBar from 'material-ui/AppBar';

import MainContent from './MainContent';

export default function () {
    return (
        <MuiThemeProvider>
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <AppBar title="larissa" />
                <NodeListDrawer />
                <MainContent />
            </div>
        </MuiThemeProvider>
    );
}
