import {
    UPDATE_GRAPH,
    SET_CURRENT_PIPELINE
} from './actions';

import {List} from 'immutable';

const initState = {
    graph: {},
    currentNode: null,
    nodeHistory: new List(),
    inspected: null
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_GRAPH: {
            return {...state, graph: action.payload};
        }
        case SET_CURRENT_PIPELINE: {
            const nodeIndex = state.nodeHistory.findIndex(node => node.id === action.payload.id);
            const currentIndex = state.nodeHistory.findIndex(node => node.id === state.currentNode);
            if (nodeIndex > -1) {
                return {...state, currentNode: action.payload.id};
            } else {
                if (action.meta.appendToHistory) {
                    const newHistory = state.nodeHistory.splice(currentIndex + 1);
                    return {
                        ...state,
                        nodeHistory: newHistory.push(action.payload),
                        currentNode: action.payload.id
                    };
                } else {
                    return {...state, nodeHistory: new List([action.payload]), currentNode: action.payload.id};
                }
            }
        }
        default: {
            return state;
        }
    }
};
