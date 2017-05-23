import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import env from '../larissa/environment';

import Paper from 'material-ui/Paper';

import Ports from './Ports';
import StatusBar from './StatusBar';

import {selectBlock} from '../actions';

const blockWidth = 250;
const blockHeight = 150;
const blockVerticalSeparation = 50;
const blockHorizontalSeparation = 100;

const blockStyle = {
    width: blockWidth,
    height: blockHeight,
    position: 'absolute',
    margin: 20
};

function getHeight(nNodes) {
    return nNodes * blockHeight + (nNodes - 1) * blockVerticalSeparation;
}

class Block extends Component {
    render() {
        let padding = 0;
        if (this.props.maxWidth > this.props.totalWidth) {
            padding = Math.round((getHeight(this.props.maxWidth) - getHeight(this.props.totalWidth)) / 2);
        }
        const info = this.props.info;
        const blockType = env.getBlock(info.type);
        const left = this.props.depth * (blockWidth + blockHorizontalSeparation);
        const top = (this.props.width - 1) * (blockHeight + blockVerticalSeparation) + padding;
        return (
            <Paper zDepth={this.props.selected ? 1 : 1}
                   style={{...blockStyle, left, top, border: this.props.selected ? 'solid 1px blue' : null}}
                   onClick={this.handleClick.bind(this)}>
                <StatusBar status={info.status} />
                <Ports node={info.id} type="input" value={blockType.inputs} width={blockWidth} height={blockHeight} />
                <Ports node={info.id} type="output" value={blockType.outputs} width={blockWidth} height={blockHeight} />
                <div style={{padding: 5}}>
                    <h4 style={{marginTop: 0}}>{blockType.label || blockType.name}</h4>
                </div>
            </Paper>
        );
    }

    handleClick(event) {
        event.stopPropagation();
        this.props.selectBlock(this.props.info);
    }
}

const mapStateToProps = (state, ownProps) => {
    const info = state.pipeline.nodes[ownProps.node];
    return {
        info: info
        // selected: info.id === state.pipeline.selectedNode.id
    };
};

export default connect(mapStateToProps, {selectBlock})(Block);
