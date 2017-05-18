import env from '../environment';

const blocks = env.getBlockList();
blocks.forEach(b => b.label = b.label || b.name);
const defaultState = blocks;

export default function (state = defaultState, action) {
    switch (action.type) {
        // TODO: handle CREATE_BLOCK
        default:
            return state;
    }
}
