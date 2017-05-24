import {
    UNSELECT_NODE,
    SELECT_BLOCK
} from '../actions';

const defaultState = {
    selectedNode: {}
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case SELECT_BLOCK:
            return {...state, selectedNode: action.payload};
        case UNSELECT_NODE:
            return {...state, selectedNode: {}};
        default:
            return state;
    }
}
