import {routerMiddleware} from 'react-router-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import history from './history';
import './index.css';

import reducers from './reducers/index';
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware(),
    routerMiddleware(history)
)(createStore);

export default createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
