import {routerMiddleware} from 'react-router-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import history from './history';
import env from './larissa/environment';
import './index.css';

import reducers from './reducers/index';

import {memoryMiddleware} from './larissa/redux';

const middlewares = [
    memoryMiddleware(env),
    thunkMiddleware,
    promiseMiddleware(),
    routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
);

const store = createStore(reducers, enhancer);
export default store;

if (module.hot) {
    module.hot.accept('./reducers/index', () => {
        store.replaceReducer(reducers);
    });
}
