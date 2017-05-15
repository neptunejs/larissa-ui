import {
    OPEN_NODELIST_DRAWER,
    CLOSE_NODELIST_DRAWER,
    TOGGLE_NODELIST_DRAWER
} from '../actions/index';

export default function(state = {open: true}, action) {
    switch(action.type) {
        case OPEN_NODELIST_DRAWER:
            return {open: true};
        case CLOSE_NODELIST_DRAWER:
            return {open: false};
        case TOGGLE_NODELIST_DRAWER:
            return {open: !state.open}
        default:
            return state;
    }
}