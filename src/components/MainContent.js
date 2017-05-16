import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import Block from './Block';
import SvgLines from './SvgLines';

const testDefinition = {
    name: 'testnode',
    label: 'My test node',
    inputs: [
        {name: 'input1'},
        {name: 'input2', multiple: true},
        {name: 'input3'}
    ],
    outputs: [
        {name: 'output1'},
        {name: 'output2'}
    ],
    options: null
};

const testDefinition2 = {
    name: 'test2',
    inputs: [
        {name: 'input'}
    ]
};


class MainContent extends Component {
    render() {
        return (
            <div style={{flex: 0.99, marginLeft: this.props.drawerOpen ? 256 : 0}}>
                <div style={{position: 'relative', height: '100%'}}>
                    <SvgLines lines={[[[612, 202], [735, 227]]]} />
                    <Block status="error" definition={testDefinition} style={{top: 150, left: 350}} />
                    <Block status="running" definition={testDefinition2} style={{position: 'absolute', top: 150, left: 750}} />
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        drawerOpen: state.drawer.open
    };
};

export default connect(mapStateToProps)(MainContent);
