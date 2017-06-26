import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import {createElement} from 'react';
import {render} from 'react-dom';
import {ConnectedRouter} from 'react-router-redux';
import DragDropProvider from './components/DragDropProvider';
import {AppContainer} from 'react-hot-loader';


import './index.css';
import store from './store';
import App from './components/App';
import history from './history';

const renderApp = (Component) => {
    render(
        <AppContainer>
            <DragDropProvider store={store}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </DragDropProvider>
        </AppContainer>,
        document.getElementById('app')
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        renderApp(App);
    });
}
