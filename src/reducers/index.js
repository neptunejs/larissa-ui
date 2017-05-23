import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import drawerReducer from './drawerReducer';
import nodesReducer from './nodesReducer';
import pipelineUIReducer from './pipelineUIReducer';
import {reducer as larissaReducer} from '../larissa/redux';

const rootReducer = combineReducers({
    router: routerReducer,
    drawer: drawerReducer,
    blockTypes: nodesReducer,
    pipeline: larissaReducer,
    pipelineUI: pipelineUIReducer
});

export default rootReducer;
