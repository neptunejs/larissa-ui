import {createElement, Component} from 'react';
import TableRenderer from './type/table';
import {connect} from 'react-redux';

import findBlockType from '../../../util/findBlockType';

class Renderer extends Component {
    render() {
        const {type, data} = this.props;
        if (!type || !data) return <div>Not available</div>;
        let TypeRenderer;
        switch (type) {
            case 'table':
                TypeRenderer = TableRenderer;
                break;
            default:
                return <div>Cannot display this type {type}</div>;
        }
        return (
            <TypeRenderer data={data} />
        );
    }
}

const mapStateToProps = (state) => {
    const node = state.pipeline.nodes[state.pipelineUI.selectedNode];
    const outputs = Array.from(node.outputs);
    if (outputs.length) {
        const val = outputs[0][1].value;
        return {
            type: findBlockType(state.blockTypes, node.node.type).outputs[0].type,
            data: val
        };
    }
    return {
        data: null,
        type: null
    };
};

export default connect(mapStateToProps)(Renderer);
