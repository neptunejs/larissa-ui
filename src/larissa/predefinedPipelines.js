
export default [
    {
        label: 'IRIS - PCA',
        kind: 'pipeline',
        value: {"kind":"pipeline","status":"FINISHED","id":"55867e84-ee3d-4451-aba9-5dafa342a88f$1","inputs":[],"outputs":[],"graph":"[[\"ef4198a5-b209-4e6a-9fc3-42f6b8fae2d4$1\",{\"kind\":\"block\",\"id\":\"ef4198a5-b209-4e6a-9fc3-42f6b8fae2d4$1\",\"type\":\"string\",\"blockType\":{\"name\":\"string\",\"plugin\":\"\",\"identifier\":\"string\",\"inputs\":[],\"outputs\":[{\"name\":\"string\",\"type\":\"string\"}],\"schema\":{\"type\":\"object\",\"properties\":{\"value\":{\"type\":\"string\",\"required\":true}}},\"validator\":{\"type\":\"object\",\"properties\":{\"value\":{\"type\":\"string\",\"required\":true}}}},\"options\":{\"value\":\"https://www.lactame.com/files/IRIS.csv\"},\"status\":\"FINISHED\",\"title\":\"string\"}],[\"315841b8-5b49-482c-8c38-d3c0b554dacd$1\",{\"kind\":\"block\",\"id\":\"315841b8-5b49-482c-8c38-d3c0b554dacd$1\",\"type\":\"request\",\"blockType\":{\"name\":\"request\",\"plugin\":\"\",\"identifier\":\"request\",\"inputs\":[{\"name\":\"url\",\"type\":\"string\"}],\"outputs\":[{\"name\":\"data\",\"type\":\"string\"}],\"schema\":null,\"validator\":null},\"options\":{},\"status\":\"FINISHED\",\"title\":\"request\"}],[[\"ef4198a5-b209-4e6a-9fc3-42f6b8fae2d4$1\",\"315841b8-5b49-482c-8c38-d3c0b554dacd$1\"],[\"ef4198a5-b209-4e6a-9fc3-42f6b8fae2d4$1_output_string:315841b8-5b49-482c-8c38-d3c0b554dacd$1_input_url\"]]]","title":"Pipeline"}
    }
];
