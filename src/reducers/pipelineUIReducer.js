import {
    UNSELECT_NODE
} from '../actions';
import {
    DELETE_NODE,
    INSPECT_NODE,
    NODE_CHANGED
} from '../larissa/redux/actions';

const defaultState = {
    selectedNode: {
        node: {}
    },
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case INSPECT_NODE:
            return {...state, selectedNode: action.payload};
        case NODE_CHANGED:
            if (state.selectedNode.node.id === action.payload.node.id) {
                return {...state, selectedNode: action.payload};
            }
            return state;
        case UNSELECT_NODE:
            return {...state, selectedNode: {node: {}}};
        case DELETE_NODE: {
            if (state.selectedNode.id === action.payload) {
                return {...state, selectedNode: {node: {}}};
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}
