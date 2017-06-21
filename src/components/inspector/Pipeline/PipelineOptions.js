import {createElement, Component} from 'react';
import Form from 'react-jsonschema-form';
import {connect} from 'react-redux';
import * as customWidgets from '../../jsonschemaForm/Widgets';
import {FieldTemplate, ArrayFieldTemplate} from '../../jsonschemaForm/Templates';
import pipelineUserOptionsSelector from '../../../selectors/pipelineUserOptionsSelector';
import {setNodeOptions} from '../../../larissa/redux';

class PipelineOptions extends Component {
    render() {
        const renderSchema = ({title, schema, node}) => {
            if (schema === null) return <div>No options for this node</div>;
            return (
                <div key={title}>
                    <h4>{title}</h4>
                    <Form schema={schema}
                        formData={node.options}
                        onChange={(data) => {
                            this.props.setNodeOptions({
                                id: node.id,
                                options: data.formData
                            });
                        }}
                        widgets={customWidgets}
                        FieldTemplate={FieldTemplate}
                        ArrayFieldTemplate={ArrayFieldTemplate}
                    >
                        {/*Prevent submit button to appear by providing children to Form*/}
                        <div />
                    </Form>
                </div>
            );
        };
        if (!this.props.options.length) {
            return <div>No options for this pipeline</div>;
        }
        return (
            <div>
                {this.props.options.map(renderSchema)}
            </div>
        );
    }
}

export default connect(pipelineUserOptionsSelector, {setNodeOptions})(PipelineOptions);
