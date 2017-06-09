
export default [
    {
        label: 'IRIS - PCA',
        kind: 'pipeline',
        value: {"kind":"pipeline","status":"FINISHED","id":"55867e84-ee3d-4451-aba9-5dafa342a88f$1$1$1$1$1$1$1$1","inputs":[],"outputs":[],"graph":"[[\"ef4198a5-b209-4e6a-9fc3-42f6b8fae2d4$1$1$1$1$1$1$1$1\",{\"kind\":\"block\",\"id\":\"ef4198a5-b209-4e6a-9fc3-42f6b8fae2d4$1$1$1$1$1$1$1$1\",\"type\":\"string\",\"blockType\":{\"name\":\"string\",\"plugin\":\"\",\"identifier\":\"string\",\"inputs\":[],\"outputs\":[{\"name\":\"string\",\"type\":\"string\"}],\"schema\":{\"type\":\"object\",\"properties\":{\"value\":{\"type\":\"string\",\"required\":true,\"multiLine\":true}}},\"validator\":{\"type\":\"object\",\"properties\":{\"value\":{\"type\":\"string\",\"required\":true,\"multiLine\":true}}}},\"options\":{\"value\":\"https://direct.lactame.com/files/IRIS.csv\"},\"status\":\"FINISHED\",\"title\":\"URL\"}],[\"315841b8-5b49-482c-8c38-d3c0b554dacd$1$1$1$1$1$1$1$1\",{\"kind\":\"block\",\"id\":\"315841b8-5b49-482c-8c38-d3c0b554dacd$1$1$1$1$1$1$1$1\",\"type\":\"request\",\"blockType\":{\"name\":\"request\",\"plugin\":\"\",\"identifier\":\"request\",\"inputs\":[{\"name\":\"url\",\"type\":\"string\"}],\"outputs\":[{\"name\":\"data\",\"type\":\"string\"}],\"schema\":null,\"validator\":null},\"options\":{},\"status\":\"FINISHED\",\"title\":\"Get iris dataset\"}],[\"415deab4-9fec-4322-9747-b6d90869c437$1$1$1$1$1$1\",{\"kind\":\"block\",\"id\":\"415deab4-9fec-4322-9747-b6d90869c437$1$1$1$1$1$1\",\"type\":\"csv-parse\",\"blockType\":{\"name\":\"csv-parse\",\"plugin\":\"\",\"identifier\":\"csv-parse\",\"inputs\":[{\"name\":\"csv\",\"type\":\"string\",\"multiple\":false,\"required\":true}],\"outputs\":[{\"name\":\"parsed\",\"type\":\"table\"}],\"schema\":{\"type\":\"object\",\"properties\":{\"delimiter\":{\"type\":\"string\",\"required\":false,\"default\":\"\"},\"newline\":{\"type\":\"string\",\"required\":false,\"default\":\"\"},\"dynamicTyping\":{\"type\":\"boolean\",\"required\":false,\"default\":false},\"hasHeader\":{\"type\":\"boolean\",\"required\":false,\"default\":false},\"skipEmptyLines\":{\"type\":\"boolean\",\"required\":false,\"default\":true}}},\"validator\":{\"type\":\"object\",\"properties\":{\"delimiter\":{\"type\":\"string\",\"required\":false,\"default\":\"\"},\"newline\":{\"type\":\"string\",\"required\":false,\"default\":\"\"},\"dynamicTyping\":{\"type\":\"boolean\",\"required\":false,\"default\":false},\"hasHeader\":{\"type\":\"boolean\",\"required\":false,\"default\":false},\"skipEmptyLines\":{\"type\":\"boolean\",\"required\":false,\"default\":true}}}},\"options\":{\"delimiter\":\"\",\"newline\":\"\",\"dynamicTyping\":true,\"hasHeader\":true,\"skipEmptyLines\":true},\"status\":\"FINISHED\",\"title\":\"Parse CSV file\"}],[\"2876a3ac-5322-4e67-98fc-3c437f3b1705$1$1$1$1$1\",{\"kind\":\"block\",\"id\":\"2876a3ac-5322-4e67-98fc-3c437f3b1705$1$1$1$1$1\",\"type\":\"column-filter\",\"blockType\":{\"name\":\"column-filter\",\"plugin\":\"\",\"identifier\":\"column-filter\",\"inputs\":[{\"name\":\"table\",\"type\":\"table\"}],\"outputs\":[{\"name\":\"filtered\",\"type\":\"matrix\"}],\"schema\":{\"type\":\"object\",\"properties\":{\"columns\":{\"type\":\"array\",\"label\":\"Columns\",\"items\":{\"type\":\"string\"}}}},\"validator\":{\"type\":\"object\",\"properties\":{\"columns\":{\"type\":\"array\",\"label\":\"Columns\",\"items\":{\"type\":\"string\"}}}}},\"options\":{\"columns\":[\"sepal_length\",\"sepal_width\",\"petal_length\",\"petal_width\"]},\"status\":\"FINISHED\",\"title\":\"Filter columns\"}],[\"c4f6a389-02da-4732-94a7-75fce53a0483$1$1\",{\"kind\":\"block\",\"id\":\"c4f6a389-02da-4732-94a7-75fce53a0483$1$1\",\"type\":\"mljs/PCA\",\"blockType\":{\"name\":\"PCA\",\"plugin\":\"mljs\",\"identifier\":\"mljs/PCA\",\"inputs\":[{\"name\":\"dataset\",\"type\":\"matrix\"}],\"outputs\":[{\"name\":\"projection\",\"type\":\"matrix\"}],\"schema\":null,\"validator\":null},\"options\":{},\"status\":\"FINISHED\",\"title\":\"Compute PCA\"}],[[\"ef4198a5-b209-4e6a-9fc3-42f6b8fae2d4$1$1$1$1$1$1$1$1\",\"315841b8-5b49-482c-8c38-d3c0b554dacd$1$1$1$1$1$1$1$1\"],[\"ef4198a5-b209-4e6a-9fc3-42f6b8fae2d4$1$1$1$1$1$1$1$1_output_string:315841b8-5b49-482c-8c38-d3c0b554dacd$1$1$1$1$1$1$1$1_input_url\"]],[[\"315841b8-5b49-482c-8c38-d3c0b554dacd$1$1$1$1$1$1$1$1\",\"415deab4-9fec-4322-9747-b6d90869c437$1$1$1$1$1$1\"],[\"315841b8-5b49-482c-8c38-d3c0b554dacd$1$1$1$1$1$1$1$1_output_data:415deab4-9fec-4322-9747-b6d90869c437$1$1$1$1$1$1_input_csv\"]],[[\"415deab4-9fec-4322-9747-b6d90869c437$1$1$1$1$1$1\",\"2876a3ac-5322-4e67-98fc-3c437f3b1705$1$1$1$1$1\"],[\"415deab4-9fec-4322-9747-b6d90869c437$1$1$1$1$1$1_output_parsed:2876a3ac-5322-4e67-98fc-3c437f3b1705$1$1$1$1$1_input_table\"]],[[\"2876a3ac-5322-4e67-98fc-3c437f3b1705$1$1$1$1$1\",\"c4f6a389-02da-4732-94a7-75fce53a0483$1$1\"],[\"2876a3ac-5322-4e67-98fc-3c437f3b1705$1$1$1$1$1_output_filtered:c4f6a389-02da-4732-94a7-75fce53a0483$1$1_input_dataset\"]]]","title":"IRIS - PCA"}
    },
    {
        label: 'Image analysis',
        kind: 'pipeline',
        value: {"kind":"pipeline","status":"FINISHED","id":"ea70244d-b693-4e1d-8467-fb0ceb9cfa4d","inputs":[],"outputs":[],"graph":"[[\"4b82fca3-7890-44f2-9558-1dfca1f0a1ee\",{\"kind\":\"block\",\"id\":\"4b82fca3-7890-44f2-9558-1dfca1f0a1ee\",\"type\":\"string\",\"blockType\":{\"name\":\"string\",\"plugin\":\"\",\"identifier\":\"string\",\"inputs\":[],\"outputs\":[{\"name\":\"string\",\"type\":\"string\"}],\"schema\":{\"type\":\"object\",\"properties\":{\"value\":{\"type\":\"string\",\"required\":true,\"multiLine\":true}}},\"validator\":{\"type\":\"object\",\"properties\":{\"value\":{\"type\":\"string\",\"required\":true,\"multiLine\":true}}}},\"options\":{\"value\":\"https://direct.lactame.com/files/xtc1.png\"},\"status\":\"FINISHED\",\"title\":\"Image URL\"}],[\"c49e8acf-bfbe-4742-8167-97cdd92098fb\",{\"kind\":\"block\",\"id\":\"c49e8acf-bfbe-4742-8167-97cdd92098fb\",\"type\":\"image-js/load\",\"blockType\":{\"name\":\"load\",\"plugin\":\"image-js\",\"identifier\":\"image-js/load\",\"inputs\":[{\"name\":\"path\",\"label\":\"Image path or URL\",\"type\":\"string\"}],\"outputs\":[{\"name\":\"loaded\",\"label\":\"Loaded image\",\"type\":\"image\"}],\"schema\":null,\"validator\":null},\"options\":{},\"status\":\"FINISHED\",\"title\":\"load\"}],[\"4d6ab88e-4168-4838-accf-ce957c2b787a\",{\"kind\":\"block\",\"id\":\"4d6ab88e-4168-4838-accf-ce957c2b787a\",\"type\":\"image-js/greyscale\",\"blockType\":{\"name\":\"greyscale\",\"plugin\":\"image-js\",\"identifier\":\"image-js/greyscale\",\"inputs\":[{\"name\":\"image\",\"type\":\"image\"}],\"outputs\":[{\"name\":\"image\",\"type\":\"image\"}],\"schema\":null,\"validator\":null},\"options\":{},\"status\":\"FINISHED\",\"title\":\"greyscale\"}],[[\"4b82fca3-7890-44f2-9558-1dfca1f0a1ee\",\"c49e8acf-bfbe-4742-8167-97cdd92098fb\"],[\"4b82fca3-7890-44f2-9558-1dfca1f0a1ee_output_string:c49e8acf-bfbe-4742-8167-97cdd92098fb_input_path\"]],[[\"c49e8acf-bfbe-4742-8167-97cdd92098fb\",\"4d6ab88e-4168-4838-accf-ce957c2b787a\"],[\"c49e8acf-bfbe-4742-8167-97cdd92098fb_output_loaded:4d6ab88e-4168-4838-accf-ce957c2b787a_input_image\"]]]","title":"Image analysis"}
    }
];
