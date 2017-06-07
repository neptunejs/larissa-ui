import {createElement} from 'react';
import {connect} from 'react-redux';
import {TextField} from 'material-ui';
import {setNodeTitle} from '../../larissa/redux';

const NodeOptions = props => {
    return (
        <div style={{margin: 10}}>
            <TextField name="node_title" floatingLabelText="Title" value={props.node.title} onChange={(event) => {
                props.setNodeTitle({id: props.node.id, value: event.target.value});
            }}
            />
        </div>
    );
};


export default connect(null, {setNodeTitle})(NodeOptions);

