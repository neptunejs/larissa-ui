import {
    UNSELECT_NODE,
    SELECT_NODE,
} from '../actions';
import {DELETE_NODE} from '../larissa/redux/actions';

const defaultState = {
    selectedNode: {}
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case SELECT_NODE:
            return {...state, selectedNode: action.payload};
        case UNSELECT_NODE:
            return {...state, selectedNode: {}};
        case DELETE_NODE: {
            if (state.selectedNode.id === action.payload) {
                return {...state, selectedNode: {}};
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}
