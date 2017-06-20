import {createElement, Component} from 'react';
import CandidateEditor from './CandidateEditor';
import {connect} from 'react-redux';
import {linkInput, linkOutput} from '../../../larissa/redux/index';
import pipelineOptionsSelector from '../../../selectors/pipelineOptionsSelector';

class PipelineLinkInterfaces extends Component {
    render() {
        return (
            <div style={{margin: 10}}>
                <CandidateEditor
                    candidates={this.props.inputCandidates}
                    label="Inputs"
                    buttonText="Link Input"
                    getValue={(candidate) => candidate.id}
                    getKey={(candidate) => candidate.id}
                    getText={(candidate) => `${candidate.node.title} - ${candidate.port}`}
                    onSubmit={(candidate, name) => {
                        this.props.linkInput(this.props.node.node.id, candidate, name);
                    }}
                />
                <CandidateEditor
                    candidates={this.props.outputCandidates}
                    label="Outputs"
                    buttonText="Link Output"
                    getValue={(candidate) => candidate.id}
                    getKey={(candidate) => candidate.id}
                    getText={(candidate) => `${candidate.node.title} - ${candidate.port}`}
                    onSubmit={(candidate, name) => {
                        this.props.linkOutput(this.props.node.node.id, candidate, name);
                    }}
                />
            </div>
        );
    }
}

export default connect(pipelineOptionsSelector, {linkInput, linkOutput})(PipelineLinkInterfaces);
