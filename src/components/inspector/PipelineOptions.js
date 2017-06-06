import {createElement, Component} from 'react';
import {TextField, RaisedButton, SelectField, MenuItem} from 'material-ui';
import {connect} from 'react-redux';
import {linkInput, linkOutput} from '../../larissa/redux';

class PipelineOptions extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <h2>Pipeline options</h2>
                <CandidateEditor
                    candidates={this.props.node.inputCandidates}
                    label="Inputs"
                    onSubmit={(input, name) => {
                        console.log(input, name);
                        this.props.linkInput(input, name);
                    }}/>
                <CandidateEditor
                    candidates={this.props.node.outputCandidates}
                    label="Outputs"
                    onSubmit={(output, name) => {
                        console.log(output, name);
                        this.props.linkOutput(output, name);
                    }
                    }/>
            </div>
        );
    }
}

class CandidateEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                <TextField name="link_name" hintText="Link name"/>
                <RaisedButton onClick={(event) => {
                    this.props.onSubmit(this.props.candidates.find(candidate => candidate.info.id === this.state.value), event.target.value);
                }} label="Link input"/>
            </div>
        );
    }
}

function renderCandidate(candidate) {
    return (
        <MenuItem value={candidate.info.id} key={candidate.info.id} primaryText={candidate.node.title}/>
    );
}

export default connect(null, {linkInput, linkOutput})(PipelineOptions);
