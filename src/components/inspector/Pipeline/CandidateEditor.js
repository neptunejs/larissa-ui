import {createElement, Component} from 'react';
import {SelectField, RaisedButton, TextField, MenuItem} from 'material-ui';

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
        const {getKey, getValue, getText, candidates} = this.props;
        return (
            <div>
                <h4>{this.props.label}</h4>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    this.props.onSubmit(candidates.find(candidate => getValue(candidate) === this.state.value), this.state.name);
                    this.setState({
                        name: '',
                        value: ''
                    });
                }}>
                    <SelectField
                        style={{width: '100%'}}
                        floatingLabelText="Select"
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    >
                        {candidates.map(renderCandidate(getKey, getValue, getText))}
                    </SelectField>
                    <TextField
                        name="name"
                        hintText={this.props.hintText}
                        value={this.state.name}
                        onChange={(event) => this.setState({name: event.target.value})}
                    />
                    <RaisedButton type="submit" label={this.props.buttonText}/>
                </form>
            </div>
        );
    }
}

function renderCandidate(getKey, getValue, getText) {
    return function (data) {
        return (
            <MenuItem
                value={getValue(data)}
                key={getKey(data)}
                primaryText={getText(data)}
            />
        );
    };
}

export default CandidateEditor;
