import {routerMiddleware} from 'react-router-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import history from './history';
import env from './larissa/environment';
import './index.css';

import reducers from './reducers/index';

import {memoryMiddleware} from './larissa/redux';

const createStoreWithMiddleware = applyMiddleware(
    memoryMiddleware(env),
    thunkMiddleware,
    promiseMiddleware(),
    routerMiddleware(history)
)(createStore);

export default createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
