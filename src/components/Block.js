import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import env from '../environment';

import Paper from 'material-ui/Paper';

import Ports from './Ports';
import StatusBar from './StatusBar';

const blockWidth = 250;
const blockHeight = 150;

const blockStyle = {
    width: blockWidth,
    height: blockHeight,
    position: 'absolute',
    margin: 20
};

class Block extends Component {
    render() {
        const info = this.props.info;
        const blockType = env.getBlock(info.type);
        const left = this.props.depth * (blockWidth + 50);
        const top = (this.props.width - 1) * (blockHeight + 50);
        return (
            <Paper style={{...blockStyle, left, top}}>
                <StatusBar status={this.props.info.status} />
                <Ports type="input" value={blockType.inputs} width={blockWidth} height={blockHeight} />
                <Ports type="output" value={blockType.outputs} width={blockWidth} height={blockHeight} />
                <div style={{padding: 5}}>
                    <h4 style={{marginTop: 0}}>{blockType.label || blockType.name}</h4>
                </div>
            </Paper>
        );
    }
}

export default connect((state, ownProps) => {
    return {
        info: state.pipeline.nodes[ownProps.node]
    };
})(Block);
