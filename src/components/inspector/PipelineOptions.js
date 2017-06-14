import {createElement, Component} from 'react';
import {TextField, RaisedButton, SelectField, MenuItem} from 'material-ui';
import {connect} from 'react-redux';
import {linkInput, linkOutput} from '../../larissa/redux';

class PipelineOptions extends Component {
    render() {
        return (
            <div style={{margin: 10}}>
                <CandidateEditor
                    candidates={this.props.node.inputCandidates}
                    label="Inputs"
                    buttonText="Link Input"
                    onSubmit={(input, name) => {
                        this.props.linkInput(this.props.node.node.id, input, name);
                    }}
                />
                <CandidateEditor
                    candidates={this.props.node.outputCandidates}
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
            linkName: ''
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
                <TextField name="link_name" hintText="Link name" value={this.state.linkName} onChange={(event) => this.setState({linkName: event.target.value})} />
                <RaisedButton onClick={() => {
                    this.props.onSubmit(this.props.candidates.find(candidate => candidate.info.id === this.state.value), this.state.linkName);
                }} label={this.props.buttonText} />
            </div>
        );
    }
}

function renderCandidate(candidate) {
    return (
        <MenuItem value={candidate.info.id} key={candidate.info.id} primaryText={`${candidate.node.title} - ${candidate.info.name}`} />
    );
}

export default connect(null, {linkInput, linkOutput})(PipelineOptions);
