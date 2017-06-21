import {createAction} from 'redux-actions';

export const CREATE_BLOCK = '@@larissa/CREATE_BLOCK';
export const createBlock = createAction(CREATE_BLOCK);

export const CREATE_PIPELINE = '@@larissa/CREATE_PIPELINE';
export const createPipeline = createAction(CREATE_PIPELINE);

export const CREATE_LOOP = '@@larissa/CREATE_LOOP';
export const createLoop = createAction(CREATE_LOOP);

export const CREATE_PIPELINE_FROM_JSON = '@@larissa/CREATE_PIPELINE_FROM_JSON';
export const createPipelineFromJSON = createAction(CREATE_PIPELINE_FROM_JSON);

export const CREATE_BLOCK_WITH_CONNECTION = '@@larissa/CREATE_BLOCK_WITH_CONNECTION';
export const createBlockWithConnection = createAction(CREATE_BLOCK_WITH_CONNECTION);

export const CONNECTION_ERROR = '@@larissa/CONNECTION_ERROR';

export const UPDATE_GRAPH = '@@larissa/UPDATE_GRAPH';
export const UPDATE_NODE = '@@larissa/UPDATE_NODE';
export const UPDATE_NODES = '@@larissa/UPDATE_NODES';
export const UPDATE_NODES_AND_GRAPH = '@@larissa/UPDATE_NODES_AND_GRAPH';

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

export const SET_PIPELINE_OPTIONS = '@@larissa/SET_PIPELINE_OPTIONS';
export const setPipelineOptions = createAction(SET_PIPELINE_OPTIONS);

export const SET_NODE_OPTIONS = '@@larissa/SET_NODE_OPTIONS';
export const setNodeOptions = createAction(SET_NODE_OPTIONS);

export const RUN_ERROR = '@@larissa/RUN_ERROR';

export const DELETE_NODE = '@@larissa/DELETE_NODE';
export const deleteNode = createAction(DELETE_NODE);

export const DELETE_LINK = '@@larissa/DELETE_LINK';
export const deleteLink = createAction(DELETE_LINK);

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

export const LINK_OPTIONS = '@@larissa/LINK_OPTIONS';
export const linkOptions = function (name, sourceNodeId, targetNodeId) {
    return {
        type: LINK_OPTIONS,
        payload: {
            name,
            sourceNodeId,
            targetNodeId
        }
    };
};

export const NODE_CHANGED = '@@larissa/NODE_CHANGED';
export const nodeChanged = createAction(NODE_CHANGED);

export const SET_NODE_TITLE = '@@larissa/SET_NODE_TITLE';
export const setNodeTitle = createAction(SET_NODE_TITLE);

export const CREATE_CONNECTION = '@@larissa/CREATE_CONNECTION';
export const createConnection = createAction(CREATE_CONNECTION);

export const DUMP_JSON = '@@larissa/DUMP_JSON';
export const dumpJson = createAction(DUMP_JSON);

export const RUN_NODE = '@@larissa/RUN_NODE';
export const runNode = createAction(RUN_NODE);

export const RESET_NODE = '@@larissa/RESET_NODE';
export const resetNode = createAction(RESET_NODE);
