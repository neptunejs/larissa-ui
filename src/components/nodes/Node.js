import {createElement, Component} from 'react';
import {connect} from 'react-redux';

import env from '../../larissa/environment';
import {
    blockWidth,
    blockHeight,
    blockMargin
} from '../../constants';

import Block from './Block';
import Pipeline from './Pipeline';

const blockStyle = {
    width: blockWidth,
    height: blockHeight,
    position: 'absolute',
    margin: blockMargin
};

class Node extends Component {
    render() {
        const info = this.props.info;
        const style = {
            ...blockStyle,
            left: this.props.left,
            top: this.props.top
        };
        switch (info.kind) {
            case 'block': {
                const blockType = env.getBlock(info.blockType.identifier);
                return <Block
                    node={info}
                    selected={this.props.selected}
                    style={style}
                    blockType={blockType}
                />;
            }
            case 'pipeline': {
                return <Pipeline
                    node={info}
                    style={style}
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
