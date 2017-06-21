import {createElement, Component} from 'react';
import {connect} from 'react-redux';

import {
    blockWidth,
    blockHeight,
    blockMargin
} from '../../constants';

import Block from './Block';
import Pipeline from './Pipeline';
import MapLoop from './MapLoop';

const blockStyle = {
    width: blockWidth,
    height: blockHeight,
    position: 'absolute',
    margin: blockMargin
};

class Node extends Component {
    render() {
        const info = this.props.info.node;
        const status = this.props.info.status;
        const blockTypes = this.props.blockTypes;
        const outputs = this.props.info.outputs;
        const style = {
            ...blockStyle,
            left: this.props.left,
            top: this.props.top
        };
        switch (info.kind) {
            case 'block': {
                const blockType = blockTypes.find((blockType) => blockType.identifier === info.type);
                return <Block
                    node={info}
                    status={status}
                    outputs={outputs}
                    selected={this.props.selected}
                    style={style}
                    blockType={blockType}
                />;
            }
            case 'pipeline': {
                return <Pipeline
                    node={info}
                    status={status}
                    style={style}
                    selected={this.props.selected}
                />;
            }
            case 'map-loop': {
                return <MapLoop
                    node={info}
                    status={status}
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
    return {
        blockTypes: state.blockTypes,
        info
    };
};

export default connect(mapStateToProps)(Node);
