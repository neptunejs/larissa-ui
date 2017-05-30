import {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    TOGGLE_DRAWER,
    TOGGLE_INSPECTOR
} from '../actions/index';

const defaultState = {
    open: true,
    inspectorOpen: true
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case OPEN_DRAWER:
            return {...state, open: true};
        case CLOSE_DRAWER:
            return {...state, open: false};
        case TOGGLE_DRAWER:
            return {...state, open: !state.open};
        case TOGGLE_INSPECTOR:
            return {...state, inspectorOpen: !state.inspectorOpen};
        default:
            return state;
    }
}
