import {
    SELECT_NODE,
    UNSELECT_NODE,
    SELECT_LINK
} from '../actions';
import {
    DELETE_NODE,
    DELETE_LINK,
    SET_CURRENT_PIPELINE
} from '../larissa/redux/actions';

const defaultState = {
    currentPipeline: null,
    selectedNode: null,
    selectedLink: null
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case SELECT_NODE:
            return {...state, selectedNode: action.payload, selectedLink: null};
        case SELECT_LINK:
            return {...state, selectedLink: action.payload, selectedNode: null};
        case UNSELECT_NODE:
            return {...state, selectedNode: null, selectedLink: null};
        case SET_CURRENT_PIPELINE:
            return {...state, currentPipeline: action.payload.id};
        case DELETE_NODE: {
            if (state.selectedNode === action.payload) {
                return {...state, selectedNode: null};
            } else {
                return state;
            }
        }
        case DELETE_LINK: {
            if (state.selectedLink === action.payload) {
                return {...state, selectedLink: null};
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}
