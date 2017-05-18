import {createElement} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NodeListDrawer from './Drawer';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import CustomDragLayer from './CustomDragLayer';
import MainAppBar from './MainAppBar';
import MainContent from './MainContent';

function App() {
    return (
        <MuiThemeProvider>
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <CustomDragLayer />
                <MainAppBar />
                <NodeListDrawer />
                <MainContent />
            </div>
        </MuiThemeProvider>
    );
}

export default DragDropContext(HTML5Backend)(App);
