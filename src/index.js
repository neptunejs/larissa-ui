import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import {createElement} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import './index.css';

import App from './components/App';
import reducers from './reducers/index';
const history = createHistory();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware(),
    routerMiddleware(history)
)(createStore);

const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);
