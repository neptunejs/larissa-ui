

const defaultState = {
    tree: [
        {
            label: 'node1'
        },
        {
            label: 'node2'
        }
    ]
};

export default function (state = defaultState, action) {
    switch (action.type) {
        default:
            return state;
    }
}