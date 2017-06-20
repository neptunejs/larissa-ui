import {createElement, Component} from 'react';
import Form from 'react-jsonschema-form';
import {TextField, Toggle} from 'material-ui';
import {connect} from 'react-redux';

import findBlockType from '../../util/findBlockType';

const FieldTemplate = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

const TextWidget = (props) => {
    const type = props.schema.type === 'number' ? 'number' : 'text';
    return (
        <TextField
            id={props.id}
            value={props.value || ''}
            floatingLabelText={props.label}
            onChange={(event) => props.onChange(event.target.value)}
            multiLine={props.schema.multiLine}
            type={type}
        />
    );
};

const CheckboxWidget = (props) => {
    return (
        <Toggle
            labelPosition="right"
            id={props.id}
            label={props.label}
            toggled={props.value}
            onToggle={(event, toggled) => props.onChange(toggled)}
        />
    );
};

const customWidgets = {TextWidget, CheckboxWidget};

class BlockOptionsAlt extends Component {
    render() {
        const blockType = findBlockType(this.props.blockTypes, this.props.node.type);
        if (!blockType.schema) {
            return <div>No schema for this block</div>;
        }
        return (
            <Form schema={blockType.schema}
                uiSchema={blockType.uiSchema || {}}
                formData={this.props.node.options}
                onChange={(data) => {
                    this.props.onChange(data.formData);
                }}
                widgets={customWidgets}
                FieldTemplate={FieldTemplate}
            >
                <div />
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        blockTypes: state.blockTypes
    };
};

export default connect(mapStateToProps)(BlockOptionsAlt);
