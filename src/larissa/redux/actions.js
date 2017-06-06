import {createAction} from 'redux-actions';

export const CREATE_BLOCK = '@@larissa/CREATE_BLOCK';
export const createBlock = createAction(CREATE_BLOCK);

export const CREATE_PIPELINE = '@@larissa/CREATE_PIPELINE';
export const createPipeline = createAction(CREATE_PIPELINE);

export const CREATE_BLOCK_WITH_CONNECTION = '@@larissa/CREATE_BLOCK_WITH_CONNECTION';
export const createBlockWithConnection = createAction(CREATE_BLOCK_WITH_CONNECTION);

export const UPDATE_GRAPH = '@@larissa/UPDATE_GRAPH';

export const RUN_PIPELINE = '@@larissa/RUN_PIPELINE';
export const runPipeline = createAction(RUN_PIPELINE);

export const SET_CURRENT_PIPELINE = '@@larissa/SET_CURRENT_PIPELINE';
export const setCurrentPipeline = function(pipeline, meta) {
    return {
        type: SET_CURRENT_PIPELINE,
        payload: pipeline,
        meta: meta || {}
    };
};

export const RESET_PIPELINE = '@@larissa/RESET_PIPELINE';
export const resetPipeline = createAction(RESET_PIPELINE);

export const SET_BLOCK_OPTIONS = '@@larissa/SET_BLOCK_OPTIONS';
export const setBlockOptions = createAction(SET_BLOCK_OPTIONS);

export const RUN_ERROR = '@@larissa/RUN_ERROR';

export const DELETE_NODE = '@@larissa/DELETE_NODE';
export const deleteNode = createAction(DELETE_NODE);
