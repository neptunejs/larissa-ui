import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import {selectNode} from '../../actions';
import PaperBlock from './PaperBlock';

class Block extends Component {
    render() {
        const {
            node: info,
            status,
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
            status={status}
            style={blockStyle}
            node={info.id}
            title={info.title}
            subtitle={blockType.label || blockType.name}
            handleClick={this.handleClick.bind(this)}
        />;
    }

    handleClick(event) {
        event.stopPropagation();
        this.props.selectNode(this.props.node.id);
    }
}

export default connect(null, {selectNode})(Block);
