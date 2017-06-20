import {routerMiddleware} from 'react-router-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import {createTransform, persistStore, autoRehydrate} from 'redux-persist';
import {Map} from 'immutable';

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
    applyMiddleware(...middlewares),
    autoRehydrate()
);

const store = createStore(reducers, enhancer);

const drawerTransform = createTransform(
    (state) => state,
    (state) => {
        return {
            ...state,
            selectedInspectorTabs: new Map(state.selectedInspectorTabs)
        };
    },
    {whitelist: ['drawer']}
);
persistStore(store, {
    transforms: [drawerTransform],
    whitelist: ['drawer']
});

if (module.hot) {
    module.hot.accept('./reducers/index', () => {
        store.replaceReducer(reducers);
    });
}

export default store;
