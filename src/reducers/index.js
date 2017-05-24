import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import drawerReducer from './drawerReducer';
import nodesReducer from './nodesReducer';
import notificationsReducer from './notificationsReducer';
import pipelineUIReducer from './pipelineUIReducer';
import {reducer as larissaReducer} from '../larissa/redux';

const rootReducer = combineReducers({
    blockTypes: nodesReducer,
    drawer: drawerReducer,
    notifications: notificationsReducer,
    pipeline: larissaReducer,
    pipelineUI: pipelineUIReducer,
    router: routerReducer
});

export default rootReducer;
