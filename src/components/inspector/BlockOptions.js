import {createElement} from 'react';
import {connect} from 'react-redux';
import {SchemaForm} from 'react-schema-form';

import {setBlockOptions} from '../../actions/index';
import findBlockType from '../../util/findBlockType';

const BlockOptions = props => {
    const blockType = findBlockType(props.blockTypes, props.node.type);
    if (!blockType.schema) {
        return <div>No schema for this block</div>;
    } else {
        return (
            <div style={{margin: 10}}>
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
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        blockTypes: state.blockTypes
    };
};

export default connect(mapStateToProps, {setBlockOptions})(BlockOptions);
