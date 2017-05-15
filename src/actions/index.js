import {createAction} from 'redux-actions';

export const OPEN_NODELIST_DRAWER = 'OPEN_NODELIST_DRAWER';
export const openNodeListDrawer = createAction(OPEN_NODELIST_DRAWER);

export const CLOSE_NODELIST_DRAWER = 'CLOSE_NODELIST_DRAWER';
export const closeNodeListDrawer = createAction(CLOSE_NODELIST_DRAWER);

export const TOGGLE_NODELIST_DRAWER = 'TOGGLE_NODELIST_DRAWER';
export const toggleNodeListDrawer = createAction(TOGGLE_NODELIST_DRAWER);