import env from '../larissa/environment';

const blocks = env.getBlockList();
blocks.forEach(b => b.label = b.label || b.name);
const defaultState = blocks;

// This reducer will have actions when we allow to load plugins dynamically
export default function (state = defaultState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
