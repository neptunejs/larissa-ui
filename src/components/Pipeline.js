import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import keydown from 'react-keydown';

import Node from './nodes/Node';
import SvgLines from './SvgLines';

import {
    blockHeight,
    blockWidth,
    blockMargin,
    blockVerticalSeparation,
    blockHorizontalSeparation,
    portSize
} from '../constants';
import placeNodes from '../util/placeNodes';
import {deleteNode} from '../larissa/redux';
import portSeparation from '../util/portSeparation';

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

                const startNode = info.node;
                const startInfo = {left, top, node: info.node};

                for (const connection of info.connected) {
                    const endInfo = placementInfo.get(connection.node);
                    const endNode = endInfo.node;
                    const outPorts = getPorts(startNode, 'outputs');
                    const outSeparation = portSeparation(outPorts.length);
                    const inPorts = getPorts(endNode, 'inputs');
                    const inSeparation = portSeparation(inPorts.length);
                    for (const [fromPort, toPort] of connection.connections) {
                        const fromIndex = getIndex(fromPort, outPorts);
                        const toIndex = getIndex(toPort, inPorts);
                        const line = [
                            [
                                left + blockWidth + blockMargin + portSize - 1,
                                top + outSeparation[fromIndex] + blockMargin + portSize / 2 + 0.5
                            ],
                            [
                                endInfo.left + blockMargin - portSize + 1,
                                endInfo.top + inSeparation[toIndex] + blockMargin + portSize / 2 + 0.5
                            ]
                        ];
                        lines.push(line);
                    }
                }

                placementInfo.set(id, startInfo);
            }
            verticalOffset += (graph.maxWidth * blockHeight) + blockVerticalSeparation;
        }
        return (
            <div style={{position: 'relative', height: '100%'}}>
                <SvgLines lines={lines} />
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

function getPorts(node, type) {
    if (node.kind === 'block') {
        return node.blockType[type];
    } else if (node.kind === 'pipeline') {
        return node[type];
    } else {
        throw new Error('unexpected node kind: ' + node.kind);
    }
}

function getIndex(which, ports) {
    for (let i = 0; i < ports.length; i++) {
        if (ports[i].name === which) return i;
    }
    throw new Error('did not find port index');
}
