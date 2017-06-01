import {
    UPDATE_GRAPH,
    SET_CURRENT_PIPELINE
} from './actions';

const initState = {
    graph: {}, currentNode: null, nodeHistory: []
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_GRAPH: {
            return {...state, graph: action.payload};
        }
        case SET_CURRENT_PIPELINE: {
            console.log('handle set current pipeline');
            const nodeIndex = state.nodeHistory.findIndex(node => node.id === action.payload.id);
            const currentIndex = state.nodeHistory.findIndex(node => node.id === state.currentNode);
            if (nodeIndex > -1) {
                return {...state, currentNode: action.payload.id};
            } else {
                if (action.meta.appendToHistory) {
                    state.nodeHistory.splice(currentIndex + 1);
                    return {
                        ...state,
                        nodeHistory: [...state.nodeHistory, action.payload],
                        currentNode: action.payload.id
                    };
                } else {
                    return {...state, nodeHistory: [action.payload], currentNode: action.payload.id};
                }
            }
        }
        default: {
            return state;
        }
    }
};

