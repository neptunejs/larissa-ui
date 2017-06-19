import {blue700} from 'material-ui/styles/colors';

export const drawerWidth = 256;
export const inspectorWidth = 450;
export const portSize = 15;

export const blockWidth = 200;
export const blockHeight = 100;
export const blockMargin = 20;
export const blockVerticalSeparation = 50;
export const blockHorizontalSeparation = 100;

export const selectedColor = blue700;

export const ItemTypes = {
    BLOCK_NODE: 'BLOCK_NODE',
    NODE_PORT: 'NODE_PORT'
};

// TODO: should this be imported from larissa ?
export const INSTANTIATED = 'INSTANTIATED';
export const READY = 'READY';
export const ERRORED = 'ERRORED';
export const RUNNING = 'RUNNING';
export const FINISHED = 'FINISHED';
