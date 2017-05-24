import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import keydown from 'react-keydown'

import Block from './Block';

import placeNodes from '../util/placeNodes';

@connect((state) => {
    return {
        graph: placeNodes(state.pipeline),
        selectedNode: state.pipelineUI.selectedNode
    };
})
export default class Pipeline extends Component {
    render() {
        const graph = this.props.graph;
        if (!graph) return null;
        const blocks = [];
        const widths = {};
        for (const level of graph.levels) {
            widths[level[0]] = {total: level[1], current: level[1]};
        }
        for (const [id, info] of graph.nodes) {
            const widthObj = widths[info.level];
            const width = widthObj.current--;
            blocks.push(<Block
                key={id}
                node={id}
                depth={graph.totalLevels - info.level}
                width={width}
                maxWidth={graph.maxWidth}
                totalWidth={widthObj.total}
                connected={info.connected}
                selected={this.props.selectedNode.id === id}
            />);
        }
        return (
            <div style={{position: 'relative', height: '100%'}}>
                {blocks}
            </div>
        );
    }

    @keydown('delete')
    deleteKeyPressed() {
        console.log('TODO: delete currently selected node!');
    }
}
