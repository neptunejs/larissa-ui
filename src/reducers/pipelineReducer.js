const pipeline = {
    graph: [["87fe7a48-9802-4d45-92e7-6895308216ba", {
        "kind": "block",
        "type": "number",
        "options": {"value": 5}
    }], ["7b031c36-76e3-437b-8921-f4fc26adf0b3", {
        "kind": "block",
        "type": "number",
        "options": {"value": 10}
    }], ["d5e23c8d-bdc3-415d-889f-56c17e364868", {
        "kind": "block",
        "type": "rng"
    }], ["93412b07-2a69-4ba7-8a4f-08012c4524a3", {
        "kind": "block",
        "type": "sum"
    }],
        [["87fe7a48-9802-4d45-92e7-6895308216ba", "93412b07-2a69-4ba7-8a4f-08012c4524a3"], ["87fe7a48-9802-4d45-92e7-6895308216ba_output_number:93412b07-2a69-4ba7-8a4f-08012c4524a3_input_value"]],
        [["7b031c36-76e3-437b-8921-f4fc26adf0b3", "93412b07-2a69-4ba7-8a4f-08012c4524a3"], ["7b031c36-76e3-437b-8921-f4fc26adf0b3_output_number:93412b07-2a69-4ba7-8a4f-08012c4524a3_input_value"]],
        [["d5e23c8d-bdc3-415d-889f-56c17e364868", "93412b07-2a69-4ba7-8a4f-08012c4524a3"], ["d5e23c8d-bdc3-415d-889f-56c17e364868_output_number:93412b07-2a69-4ba7-8a4f-08012c4524a3_input_value"]]
    ],
    nodes: {
        '87fe7a48-9802-4d45-92e7-6895308216ba': {
            kind: 'block',
            type: 'number',
            options: {
                value: 5
            },
            status: 'finished'
        },
        '7b031c36-76e3-437b-8921-f4fc26adf0b3': {
            kind: 'block',
            type: 'number',
            options: {
                value: 10
            },
            status: 'running'
        },
        'd5e23c8d-bdc3-415d-889f-56c17e364868': {
            kind: 'block',
            type: 'rng',
            status: 'init'
        },
        '93412b07-2a69-4ba7-8a4f-08012c4524a3': {
            kind: 'block',
            type: 'sum',
            status: 'error'
        }
    }
};

export default function (state = pipeline) {
    return state;
}
