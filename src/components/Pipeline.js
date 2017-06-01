import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import keydown from 'react-keydown';

import Node from './nodes/Node';

import {
    blockHeight,
    blockWidth,
    blockVerticalSeparation,
    blockHorizontalSeparation
} from '../constants';
import placeNodes from '../util/placeNodes';
import {deleteNode} from '../larissa/redux';
import SvgLines from './SvgLines';

@connect((state) => {
    return {
        subgraphs: placeNodes(state.pipeline),
        selectedNode: state.pipelineUI.selectedNode
    };
}, {
    deleteNode
})
export default class Pipeline extends Component {
    render() {
        const subgraphs = this.props.subgraphs;
        if (!subgraphs) return null;
        let verticalOffset = 0;
        const nodes = [];
        const lines = [];
        const placementInfo = new Map();
        for (const graph of subgraphs) {
            const widths = {};
            for (const level of graph.levels) {
                widths[level[0]] = {total: level[1], current: level[1]};
            }
            for (const [id, info] of graph.nodes) {
                const widthObj = widths[info.level];
                const width = widthObj.current--;

                let padding = 0;
                if (graph.maxWidth > widthObj.total) {
                    padding = Math.round((getHeight(graph.maxWidth) - getHeight(widthObj.total)) / 2);
                }

                const left = (graph.totalLevels - info.level) * (blockWidth + blockHorizontalSeparation);
                const top = (width - 1) * (blockHeight + blockVerticalSeparation) + padding + verticalOffset;

                nodes.push(<Node
                    key={id}
                    node={id}
                    left={left}
                    top={top}
                    selected={this.props.selectedNode.id === id}
                />);
                placementInfo.set(id, {
                    // todo add placement info for line drawing
                })
            }
            verticalOffset += (graph.maxWidth * blockHeight) + blockVerticalSeparation;
        }
        return (
            <div style={{position: 'relative', height: '100%'}}>
                <div><SvgLines lines={lines} /></div>
                {nodes}
            </div>
        );
    }

    @keydown('delete')
    deleteKeyPressed() {
        if (this.props.selectedNode) {
            this.props.deleteNode(this.props.selectedNode.id);
        }
    }
}

function getHeight(nNodes) {
    return nNodes * blockHeight + (nNodes - 1) * blockVerticalSeparation;
}
