import {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    TOGGLE_DRAWER
} from '../actions/index';

export default function (state = {open: true}, action) {
    switch (action.type) {
        case OPEN_DRAWER:
            return {open: true};
        case CLOSE_DRAWER:
            return {open: false};
        case TOGGLE_DRAWER:
            return {open: !state.open};
        default:
            return state;
    }
}
