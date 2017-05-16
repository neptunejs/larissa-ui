import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import Block from './Block';

import placeNodes from '../util/placeNodes';

class Pipeline extends Component {
    render() {
        const graph = this.props.graph;
        const blocks = [];
        const widths = {};
        for (const level of graph.levels) {
            widths[level[0]] = level[1];
        }
        for (const node of graph.nodes) {
            const width = widths[node[1]]--;
            blocks.push(<Block key={node[0]} node={node[0]} depth={graph.totalLevels - node[1]} width={width} />);
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
        graph: placeNodes(state.pipeline)
    };
})(Pipeline)
