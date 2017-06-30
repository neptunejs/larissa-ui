import {Map} from 'immutable';

import {
    MOVE_NODE
} from '../actions';

import {
    UPDATE_NODES,
    UPDATE_NODES_AND_GRAPH
} from '../larissa/redux/actions';

const defaultState = new Map();

export default function (state = defaultState, action) {
    switch (action.type) {
        case UPDATE_NODES:
        case UPDATE_NODES_AND_GRAPH: {
            // dispatched when the pipeline is loaded, a new node is added or nodes are deleted
            const nodes = action.type === UPDATE_NODES ? action.payload : action.payload.nodes;
            // remove deleted nodes
            for (const nodeId of state.keys()) {
                if (!nodes[nodeId]) {
                    state = state.delete(nodeId);
                }
            }
            // add new nodes
            for (const nodeId of Object.keys(nodes)) {
                if (!state.has(nodeId)) {
                    state = state.set(nodeId, {position: {x: 0, y: 0}});
                }
            }
            return state;
        }
        case MOVE_NODE: {
            const nodeId = action.payload.id;
            const newPosition = action.payload.position;
            const node = state.get(nodeId);
            return state.set(nodeId, {...node, position: newPosition});
        }
        default:
            return state;
    }
}
