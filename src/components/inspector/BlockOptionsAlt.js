import {createElement, Component} from 'react';
import Form from 'react-jsonschema-form';
import {setBlockOptions} from '../../actions/index';
import {connect} from 'react-redux';
import env from '../../larissa/environment';
import {TextField, Toggle} from 'material-ui';


const FieldTemplate = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
};

const TextWidget = (props) => {
    return (
        <TextField
            id={props.id}
            value={props.value}
            floatingLabelText={props.label}
            onChange={(event) => props.onChange(event.target.value)}
        />
    );
};

const CheckboxWidget = (props) => {
    return (
        <Toggle
            labelPosition="right"
            id={props.id}
            label={props.label}
            value={props.value}
            onToggle={(event, toggled) => props.onChange(toggled)}
        />
    );
};

const customWidgets = {TextWidget, CheckboxWidget};


class BlockOptionsAlt extends Component {
    render() {
        const blockType = env.getBlock(this.props.node.blockType.identifier);
        if (!blockType.schema) {
            return <div>No schema for this block</div>;
        }


        return (
            <Form schema={blockType.schema}
                  formData={this.props.node.options}
                  onChange={(data) => {
                      this.props.onChange(data.formData);
                  }}
                  widgets={customWidgets}
                  FieldTemplate={FieldTemplate}
            >
                <div></div>
            </Form>
        );

    }
}


export default connect(null, {setBlockOptions})(BlockOptionsAlt);
