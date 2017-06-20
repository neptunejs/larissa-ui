import {createElement, Component} from 'react';
import {TextField, RaisedButton, SelectField, MenuItem} from 'material-ui';
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
                    onSubmit={(input, name) => {
                        this.props.linkInput(this.props.node.node.id, input, name);
                    }}
                />
                <CandidateEditor
                    candidates={this.props.outputCandidates}
                    label="Outputs"
                    buttonText="Link Output"
                    onSubmit={(output, name) => {
                        this.props.linkOutput(this.props.node.node.id, output, name);
                    }}
                />
            </div>
        );
    }
}

class CandidateEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    render() {
        return (
            <div>
                <h4>{this.props.label}</h4>
                <SelectField style={{width: '100%'}} floatingLabelText="Select" value={this.state.value}
                    onChange={this.handleChange.bind(this)}>
                    {this.props.candidates.map(renderCandidate)}
                </SelectField>
                <TextField name="link_name" hintText="Link name" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} />
                <RaisedButton onClick={() => {
                    this.props.onSubmit(this.props.candidates.find(candidate => candidate.id === this.state.value), this.state.linkName);
                }} label={this.props.buttonText} />
            </div>
        );
    }
}

function renderCandidate(candidate) {
    return (
        <MenuItem value={candidate.id} key={candidate.id} primaryText={`${candidate.node.title} - ${candidate.port}`} />
    );
}

export default connect(pipelineOptionsSelector, {linkInput, linkOutput})(PipelineLinkInterfaces);
