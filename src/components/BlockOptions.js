import {createElement} from 'react';
import {connect} from 'react-redux';
import {SchemaForm} from 'react-schema-form';
import env from '../larissa/environment';
import {setBlockOptions} from '../actions/index';


const BlockOptions = props => {
    const blockType = env.getBlock(props.node.type);
    if (!blockType.schema) {
        return <div>No schema for this block</div>;
    } else {
        return (
            <SchemaForm schema={blockType.schema} model={props.node.options} onModelChange={(keys, value) => {
                let toChange = props.node.options;
                for (let i = 0; i < keys.length - 1; i++) {
                    toChange = toChange[keys[i]];
                }
                const key = keys[keys.length - 1];
                toChange[key] = value;
                if (props.onChange) {
                    props.onChange(props.node.options);
                }
            }} />
        );
    }
};


export default connect(null, {setBlockOptions})(BlockOptions);

