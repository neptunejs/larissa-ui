import pipeline from '../larissa/pipeline';
import {
    CREATE_BLOCK,
    CREATE_BLOCK_WITH_CONNECTION,
    UPDATE_PIPELINE,
    SELECT_BLOCK,
    UNSELECT_NODE
} from '../actions/index';

const defaultPipeline = stateFromPipeline(pipeline, {selectedNode: {}});

export default function (state = defaultPipeline, action) {
    switch (action.type) {
        case CREATE_BLOCK: {
            return stateFromPipeline(pipeline, state);
        }
        case CREATE_BLOCK_WITH_CONNECTION: {
            const nodeId = action.payload.node;
            const newNode = pipeline.newNode(action.payload.type);
            try {
                const node = pipeline.getNode(nodeId);
                if (node) {
                    if (action.payload.portType === 'input') {
                        pipeline.connect(newNode, node.input(action.payload.name));
                    }
                    if (action.payload.portType === 'output') {
                        pipeline.connect(node.output(action.payload.name), newNode);
                    }
                }
            } catch (e) {
                // TODO: dispatch action to notify user of failure
            }
            return stateFromPipeline(pipeline, state);
        }
        case UPDATE_PIPELINE: {
            return stateFromPipeline(pipeline, state);
        }
        case SELECT_BLOCK: {
            return {...state, selectedNode: action.payload};
        }
        case UNSELECT_NODE: {
            return {...state, selectedNode: {}};
        }
        default: {
            return state;
        }
    }
}


