import {createElement, Component} from 'react';
import {connect} from 'react-redux';

import {setCurrentPipeline} from '../../larissa/redux';
import {selectNode} from '../../actions';
import PaperBlock from './PaperBlock';

class MapLoop extends Component {
    render() {
        const {
            node: info,
            status,
            selected,
            style: blockStyle,
        } = this.props;

        return <PaperBlock
            inputs={info.inputs}
            outputs={info.outputs}
            selected={selected}
            status={status}
            style={blockStyle}
            node={info.id}
            title={info.title}
            subtitle="MapLoop"
            handleClick={this.handleClick.bind(this)}
            handleDoubleClick={this.handleDoubleClick.bind(this)}
        />;
    }

    handleDoubleClick() {
        this.props.setCurrentPipeline(this.props.node.loopNode, {appendToHistory: true});
    }

    handleClick(event) {
        event.stopPropagation();
        this.props.selectNode(this.props.node.id);
    }
}

const mapDispatchToProps = {
    selectNode,
    setCurrentPipeline
};

export default connect(null, mapDispatchToProps)(MapLoop);
