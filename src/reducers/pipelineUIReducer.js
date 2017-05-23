import {
    UNSELECT_NODE,
    SELECT_BLOCK
} from '../actions';

export default function (state = {selectedNode: {}}, action) {
    switch (action.type) {
        case SELECT_BLOCK:
            return {...state, selectedNode: action.payload};
        case UNSELECT_NODE:
            return {...state, selectedNode: {}};
        default:
            return state;
    }
}
