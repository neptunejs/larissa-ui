import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import env from '../../larissa/environment';

import Block from './Block';
import Pipeline from './Pipeline';

import {
    blockWidth,
    blockHeight,
    blockMargin
} from '../../constants';

const blockStyle = {
    width: blockWidth,
    height: blockHeight,
    position: 'absolute',
    margin: blockMargin
};

class Node extends Component {
    render() {
        const info = this.props.info;
        switch (info.kind) {
            case 'block': {
                const blockType = env.getBlock(info.blockType.identifier);
                return <Block
                    selected={this.props.selected}
                    blockType={blockType}
                    node={info}
                    style={{...blockStyle, left: this.props.left, top: this.props.top}}
                />;
            }
            case 'pipeline': {
                return <Pipeline
                    node={info}
                    style={{...blockStyle, left: this.props.left, top: this.props.top}}
                    selected={this.props.selected}
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
    return {info};
};

export default connect(mapStateToProps)(Node);
