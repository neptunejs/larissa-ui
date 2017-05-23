import {createAction} from 'redux-actions';

export const CREATE_BLOCK = '@@larissa/CREATE_BLOCK';
export const createBlock = createAction(CREATE_BLOCK);

export const CREATE_BLOCK_WITH_CONNECTION = '@@larissa/CREATE_BLOCK_WITH_CONNECTION';
export const createBlockWithConnection = createAction(CREATE_BLOCK_WITH_CONNECTION);

export const UPDATE_GRAPH = '@@larissa/UPDATE_GRAPH';

export const RUN_PIPELINE = '@@larissa/RUN_PIPELINE';
export const runPipeline = createAction(RUN_PIPELINE);

export const RESET_PIPELINE = '@@larissa/RESET_PIPELINE';
export const resetPipeline = createAction(RESET_PIPELINE);