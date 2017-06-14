import {Map} from 'immutable';

import {
    OPEN_DRAWER,
    CLOSE_DRAWER,
    SELECT_INSPECTOR_TAB,
    TOGGLE_DRAWER,
    TOGGLE_INSPECTOR
} from '../actions/index';

const defaultState = {
    open: true,
    inspectorOpen: true,
    selectedInspectorTabs: new Map()
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
        case SELECT_INSPECTOR_TAB:
            return {
                ...state,
                selectedInspectorTabs: state.selectedInspectorTabs.set(action.payload.kind, action.payload.value)
            };
        default:
            return state;
    }
}
