import {
    SELECT_NODE,
    UNSELECT_NODE
} from '../actions';
import {
    DELETE_NODE,
    SET_CURRENT_PIPELINE
} from '../larissa/redux/actions';

const defaultState = {
    selectedNode: null,
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case SELECT_NODE:
            return {...state, selectedNode: action.payload};
        case UNSELECT_NODE:
        case SET_CURRENT_PIPELINE:
            return {...state, selectedNode: null};
        case DELETE_NODE: {
            if (state.selectedNode === action.payload) {
                return {...state, selectedNode: null};
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}
