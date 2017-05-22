import {createAction} from 'redux-actions';

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const openDrawer = createAction(OPEN_DRAWER);

export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const closeDrawer = createAction(CLOSE_DRAWER);

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const toggleDrawer = createAction(TOGGLE_DRAWER);

export const CREATE_BLOCK = 'CREATE_BLOCK';
export const createBlock = createAction(CREATE_BLOCK);

export const CREATE_BLOCK_WITH_CONNECTION = 'CREATE_BLOCK_WITH_CONNECTION';
export const createBlockWithConnection = createAction(CREATE_BLOCK_WITH_CONNECTION);

export const UPDATE_PIPELINE = 'UPDATE_PIPELINE';
export const updatePipeline = createAction(UPDATE_PIPELINE);

export const SELECT_BLOCK = 'SELECT_BLOCK';
export const selectBlock = createAction(SELECT_BLOCK);

export const UNSELECT_NODE = 'UNSELECT_NODE';
export const unselectNode = createAction(UNSELECT_NODE);
