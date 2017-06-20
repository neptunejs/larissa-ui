import {createElement, Component} from 'react';
import CandidateEditor from './CandidateEditor';
import {connect} from 'react-redux';
import {linkOptions} from '../../../larissa/redux/index';
import pipelineLinkOptionsSelector from '../../../selectors/pipelineLinkOptionsSelector';

class PipelineLinkOptions extends Component {
    render() {
        return (
            <div style={{margin: 10}}>
                <CandidateEditor
                    candidates={this.props.graph}
                    label="Options"
                    buttonText="Link Option"
                    getKey={(data) => data[0]}
                    getValue={(data) => data[0]}
                    getText={(data) => data[1].title}
                    onSubmit={(candidate, name) => {
                        this.props.linkOptions(name, this.props.node.node.id, candidate[0]);
                    }}
                />
            </div>
        );
    }
}

export default connect(pipelineLinkOptionsSelector, {linkOptions})(PipelineLinkOptions);
