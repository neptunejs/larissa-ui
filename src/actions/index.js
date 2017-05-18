import {createAction} from 'redux-actions';

export const OPEN_DRAWER = 'OPEN_DRAWER';
export const openDrawer = createAction(OPEN_DRAWER);

export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export const closeDrawer = createAction(CLOSE_DRAWER);

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const toggleDrawer = createAction(TOGGLE_DRAWER);

export const CREATE_BLOCK = 'CREATE_BLOCK';
export const createBlock = createAction(CREATE_BLOCK);
