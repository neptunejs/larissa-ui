import {createElement, Component} from 'react';
import Form from 'react-jsonschema-form';
import {connect} from 'react-redux';
import * as customWidgets from '../../jsonschemaForm/Widgets';
import {FieldTemplate, ArrayFieldTemplate} from '../../jsonschemaForm/Templates';
import findBlockType from '../../../util/findBlockType';

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
                  ArrayFieldTemplate={ArrayFieldTemplate}
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
