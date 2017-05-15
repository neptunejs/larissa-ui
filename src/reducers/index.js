import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import drawerReducer from './drawerReducer';
import nodesReducer from './nodesReducer';

const rootReducer = combineReducers({
    router: routerReducer,
    drawer: drawerReducer,
    nodes: nodesReducer
});

export default rootReducer;
