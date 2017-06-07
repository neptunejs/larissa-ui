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
export const setCurrentPipeline = function (pipeline, meta) {
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

export const INSPECT_NODE = '@@larissa/INSPECT_NODE';
export const inspectNode = createAction(INSPECT_NODE);

export const LINK_INPUT = '@@larissa/LINK_INPUT';
export const linkInput = function (pipelineId, input, name) {
    return {
        type: LINK_INPUT,
        payload: {
            id: pipelineId,
            input, name
        }
    };
};

export const LINK_OUTPUT = '@@larissa/LINK_OUTPUT';
export const linkOutput = function (pipelineId, output, name) {
    return {
        type: LINK_OUTPUT,
        payload: {
            id: pipelineId,
            output, name
        }
    };
};

export const NODE_CHANGED = '@@larissa/NODE_CHANGED';
export const nodeChanged = createAction(NODE_CHANGED);
