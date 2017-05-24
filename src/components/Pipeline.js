import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import Block from './Block';

import placeNodes from '../util/placeNodes';

class Pipeline extends Component {
    render() {
        const graph = this.props.graph;
        if (!graph) return null;
        const blocks = [];
        const widths = {};
        for (const level of graph.levels) {
            widths[level[0]] = {total: level[1], current: level[1]};
        }
        for (const node of graph.nodes) {
            const widthObj = widths[node[1].level];
            const width = widthObj.current--;
            blocks.push(<Block
                key={node[0]}
                node={node[0]}
                depth={graph.totalLevels - node[1].level}
                width={width}
                maxWidth={graph.maxWidth}
                totalWidth={widthObj.total}
                connected={node[1].connected}
                selected={this.props.selectedNode.id === node[0]}
            />);
        }
        return (
            <div style={{position: 'relative', height: '100%'}}>
                {blocks}
            </div>
        );
    }

}

export default connect((state) => {
    return {
        graph: placeNodes(state.pipeline),
        selectedNode: state.pipelineUI.selectedNode
    };
})(Pipeline);
