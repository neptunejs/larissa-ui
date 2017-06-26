import {createElement} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NodeListDrawer from './Drawer';
import SecondaryDrawer from './inspector/Inspector';
import CustomDragLayer from './CustomDragLayer';
import MainAppBar from './MainAppBar';
import MainContent from './MainContent';
import Notifications from './Notifications';

function App() {
    return (
        <MuiThemeProvider>
            <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                <CustomDragLayer />
                <MainAppBar />
                <NodeListDrawer />
                <SecondaryDrawer />
                <MainContent />
                <Notifications />
            </div>
        </MuiThemeProvider>
    );
}

export default App;
