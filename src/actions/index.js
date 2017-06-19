import {createAction} from 'redux-actions';

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const openDrawer = createAction(OPEN_DRAWER);

export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const closeDrawer = createAction(CLOSE_DRAWER);

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const toggleDrawer = createAction(TOGGLE_DRAWER);

export const TOGGLE_INSPECTOR = 'TOGGLE_INSPECTOR';
export const toggleInspector = createAction(TOGGLE_INSPECTOR);

export const SELECT_INSPECTOR_TAB = 'SELECT_INSPECTOR_TAB';
export const selectInspectorTab = function (kind, value) {
    return {
        type: SELECT_INSPECTOR_TAB,
        payload: {kind, value}
    };
};

export const SELECT_PIPELINE = 'SELECT_PIPELINE';
export const selectPipeline = createAction(SELECT_PIPELINE);

export const SELECT_NODE = 'SELECT_NODE';
export const selectNode = createAction(SELECT_NODE);

export const UNSELECT_NODE = 'UNSELECT_NODE';
export const unselectNode = createAction(UNSELECT_NODE);

export const SELECT_LINK = 'SELECT_LINK';
export const selectLink = createAction(SELECT_LINK);

export const BLOCK_OPTIONS = 'BLOCK_OPTIONS';
export const setBlockOptions = createAction(BLOCK_OPTIONS);

export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const clearNotification = createAction(CLEAR_NOTIFICATION);
