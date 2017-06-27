import {
    DELETE_NODE,
    NODE_STATUS_CHANGE,
    UPDATE_GRAPH,
    UPDATE_NODE,
    UPDATE_NODES,
    UPDATE_NODES_AND_GRAPH,
    SET_CURRENT_PIPELINE,
} from './actions';

import {List, Map} from 'immutable';

const initState = {
    graph: {},
    nodes: {},
    nodeState: new Map(),
    currentNode: null,
    nodeHistory: new List()
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case NODE_STATUS_CHANGE: {
            const nodeId = action.payload.id;
            const status = action.payload.status;
            const previous = state.nodeState.get(nodeId);
            if (!previous) {
                return {...state, nodeState: state.nodeState.set(nodeId, {status})};
            }
            if (previous.status !== status) {
                return {...state, nodeState: state.nodeState.set(nodeId, {...previous, status})};
            }
            break;
        }
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
            const nodeState = nodeStateFromNodes(action.payload);
            return {...state, nodes: action.payload, nodeState};
        }
        case UPDATE_NODES_AND_GRAPH: {
            const nodeState = nodeStateFromNodes(action.payload.nodes);
            return {
                ...state,
                nodes: action.payload.nodes,
                graph: action.payload.graph,
                nodeState
            };
        }
        case DELETE_NODE: {
            const nodeId = action.payload;
            const nodeIndex = state.nodeHistory.indexOf(nodeId);
            if (nodeIndex !== -1) {
                return {
                    ...state,
                    nodeHistory: state.nodeHistory.remove(nodeIndex)
                };
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
    return state;
};

function nodeStateFromNodes(nodes) {
    const map = {};
    for (const nodeId of Object.keys(nodes)) {
        map[nodeId] = {status: nodes[nodeId].status};
    }
    return new Map(map);
}
