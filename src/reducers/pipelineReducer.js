const pipeline = {
    "graph": [
        [
            "b450d733-12a2-444d-a8aa-40e0a187c029",
            {
                "kind": "block",
                "type": "number",
                "options": {
                    "value": 1
                }
            }
        ],
        [
            "b450d733-12a2-444d-a8aa-40e0a187c029_output_number",
            null
        ],
        [
            "2408658d-c4c3-49dd-bdce-3d489dd7723a",
            {
                "kind": "block",
                "type": "number",
                "options": {
                    "value": 2
                }
            }
        ],
        [
            "2408658d-c4c3-49dd-bdce-3d489dd7723a_output_number",
            null
        ],
        [
            "4021a0ce-cc30-4fac-926e-c0f768195b9d",
            {
                "kind": "block",
                "type": "sum"
            }
        ],
        [
            "4021a0ce-cc30-4fac-926e-c0f768195b9d_input_value",
            null
        ],
        [
            "4021a0ce-cc30-4fac-926e-c0f768195b9d_output_sum",
            null
        ],
        [
            [
                "b450d733-12a2-444d-a8aa-40e0a187c029",
                "b450d733-12a2-444d-a8aa-40e0a187c029_output_number"
            ]
        ],
        [
            [
                "b450d733-12a2-444d-a8aa-40e0a187c029_output_number",
                "4021a0ce-cc30-4fac-926e-c0f768195b9d_input_value"
            ]
        ],
        [
            [
                "2408658d-c4c3-49dd-bdce-3d489dd7723a",
                "2408658d-c4c3-49dd-bdce-3d489dd7723a_output_number"
            ]
        ],
        [
            [
                "2408658d-c4c3-49dd-bdce-3d489dd7723a_output_number",
                "4021a0ce-cc30-4fac-926e-c0f768195b9d_input_value"
            ]
        ],
        [
            [
                "4021a0ce-cc30-4fac-926e-c0f768195b9d",
                "4021a0ce-cc30-4fac-926e-c0f768195b9d_output_sum"
            ]
        ],
        [
            [
                "4021a0ce-cc30-4fac-926e-c0f768195b9d_input_value",
                "4021a0ce-cc30-4fac-926e-c0f768195b9d"
            ]
        ]
    ],
    "nodes": {
        "b450d733-12a2-444d-a8aa-40e0a187c029": {
            "kind": "block",
            "type": "number",
            "options": {
                "value": 1
            },
            "status": "finished"
        },
        "2408658d-c4c3-49dd-bdce-3d489dd7723a": {
            "kind": "block",
            "type": "number",
            "options": {
                "value": 2
            },
            "status": "running"
        },
        "4021a0ce-cc30-4fac-926e-c0f768195b9d": {
            "kind": "block",
            "type": "sum",
            "status": "error"
        }
    }
};

export default function (state = pipeline) {
    return state;
}
