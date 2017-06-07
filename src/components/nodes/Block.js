import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import {inspectNode} from '../../larissa/redux';
import PaperBlock from './PaperBlock';

class Block extends Component {
    render() {
        const {
            node: info,
            outputs: nodeOutputs,
            blockType,
            selected,
            style: blockStyle
        } = this.props;
        return <PaperBlock
            inputs={blockType.inputs}
            outputs={blockType.outputs}
            nodeOutputs={nodeOutputs}
            selected={selected}
            status={info.status}
            style={blockStyle}
            node={info.id}
            title={info.title}
            subtitle={blockType.label || blockType.name}
            handleClick={this.handleClick.bind(this)}
        />;
    }

    handleClick(event) {
        event.stopPropagation();
        this.props.inspectNode(this.props.node.id);
    }
}

export default connect(null, {inspectNode})(Block);
