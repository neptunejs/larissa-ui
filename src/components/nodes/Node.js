import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import env from '../../larissa/environment';

import Block from './Block';

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

class Node extends Component {
    render() {
        let padding = 0;
        if (this.props.maxWidth > this.props.totalWidth) {
            padding = Math.round((getHeight(this.props.maxWidth) - getHeight(this.props.totalWidth)) / 2);
        }
        const left = this.props.depth * (blockWidth + blockHorizontalSeparation);
        const top = (this.props.width - 1) * (blockHeight + blockVerticalSeparation) + padding;

        const info = this.props.info;
        switch (info.kind) {
            case 'block': {
                const blockType = env.getBlock(info.blockType.identifier);
                return <Block
                    selected={this.props.selected}
                    width={blockWidth}
                    height={blockHeight}
                    blockType={blockType}
                    node={info}
                    style={{...blockStyle, left, top}}
                />;
            }
            default: {
                throw new Error(`Cannot render this kind of node: ${info.kind}`);
            }
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const info = state.pipeline.nodes[ownProps.node];
    return {
        info: info
        // selected: info.id === state.pipeline.selectedNode.id
    };
};

export default connect(mapStateToProps)(Node);
