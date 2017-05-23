import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import drawerReducer from './drawerReducer';
import nodesReducer from './nodesReducer';
// import pipelineReducer from './pipelineReducer';
import {reducer as larissaReducer} from '../larissa/redux';

const rootReducer = combineReducers({
    router: routerReducer,
    drawer: drawerReducer,
    blockTypes: nodesReducer,
    pipeline: larissaReducer
});

export default rootReducer;
