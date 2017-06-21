import {createElement, Component} from 'react';
import CandidateEditor from './CandidateEditor';
import PortsDisplayer from './PortsDisplayer';
import {connect} from 'react-redux';
import {linkInput, linkOutput} from '../../../larissa/redux/index';
import pipelineOptionsSelector from '../../../selectors/pipelineOptionsSelector';

class PipelineLinkInterfaces extends Component {
    render() {
        return (
            <div style={{margin: 10}}>
                <PortsDisplayer
                    ports={this.props.inputs}
                    title="Input ports"
                />
                <PortsDisplayer
                    ports={this.props.outputs}
                    title="Output ports"
                />
                <CandidateEditor
                    candidates={this.props.inputCandidates}
                    label="Add inputs"
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
                    label="Add outputs"
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
