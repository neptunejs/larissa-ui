import {
    UPDATE_GRAPH
} from './actions';

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_GRAPH: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};

