import {List} from 'immutable';

import {RUN_ERROR} from '../larissa/redux/actions';
import {
    UNSELECT_NODE,
    SELECT_BLOCK
} from '../actions';

const defaultState = {
    selectedNode: {},
    runErrors: new List()
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case SELECT_BLOCK:
            return {...state, selectedNode: action.payload};
        case UNSELECT_NODE:
            return {...state, selectedNode: {}};
        case RUN_ERROR:
            return {...state, runErrors: state.runErrors.push(action.payload)};
        default:
            return state;
    }
}
