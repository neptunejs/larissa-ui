import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import {createElement} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {AppContainer} from 'react-hot-loader';

import './index.css';
import store from './store';
import App from './components/App';
import history from './history';

const renderApp = (Component) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component/>
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        window.__isReactDndBackendSetUp = false; // react-dnd throws on reload without this
        renderApp(App);
    });
}
