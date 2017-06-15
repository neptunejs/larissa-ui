import {
    UPDATE_GRAPH,
    UPDATE_NODE,
    UPDATE_NODES,
    UPDATE_NODES_AND_GRAPH,
    SET_CURRENT_PIPELINE,
    DELETE_NODE
} from './actions';

import {List} from 'immutable';

const initState = {
    graph: {},
    nodes: {},
    currentNode: null,
    nodeHistory: new List(),
    inspected: null
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_GRAPH: {
            return {...state, graph: action.payload};
        }
        case UPDATE_NODE: {
            return {
                ...state,
                nodes: {...state.nodes, [action.payload.id]: action.payload.value}
            };
        }
        case UPDATE_NODES: {
            return {...state, nodes: action.payload};
        }
        case UPDATE_NODES_AND_GRAPH: {
            return {
                ...state,
                nodes: action.payload.nodes,
                graph: action.payload.graph
            };
        }
        case DELETE_NODE: {
            const nodeId = action.payload;
            const nodeIndex = state.nodeHistory.indexOf(nodeId);
            if (nodeIndex !== -1) {
                return {
                    ...state,
                    nodeHistory: state.nodeHistory.remove(nodeIndex)
                }
            } else {
                return state;
            }
        }
        case SET_CURRENT_PIPELINE: {
            const pipelineId = action.payload.id;
            const nodeIndex = state.nodeHistory.indexOf(pipelineId);
            const currentIndex = state.nodeHistory.indexOf(state.currentNode);
            if (nodeIndex > -1) {
                return {...state, currentNode: pipelineId};
            } else {
                if (action.meta.appendToHistory) {
                    const newHistory = state.nodeHistory.splice(currentIndex + 1);
                    return {
                        ...state,
                        nodeHistory: newHistory.push(pipelineId),
                        currentNode: pipelineId
                    };
                } else {
                    return {...state, nodeHistory: new List([pipelineId]), currentNode: pipelineId};
                }
            }
        }
        default: {
            return state;
        }
    }
};
