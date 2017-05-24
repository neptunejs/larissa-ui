import {List} from 'immutable';

import {CLEAR_NOTIFICATION} from '../actions';
import {RUN_ERROR} from '../larissa/redux/actions';

const defaultState = new List();

export default function (state = defaultState, action) {
    switch (action.type) {
        case RUN_ERROR:
            return state.push({
                type: RUN_ERROR,
                message: action.payload.message
            });
        case CLEAR_NOTIFICATION:
            return state.shift();
        default:
            return state;
    }
}
