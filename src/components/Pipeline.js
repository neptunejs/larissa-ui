import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import keydown from 'react-keydown';
import Graph from 'graph.js/dist/graph';

import findBlockType from '../util/findBlockType';

import Node from './nodes/Node';
import SvgLinks from './SvgLinks';

import {
    blockHeight,
    blockWidth,
    blockMargin,
    blockVerticalSeparation,
    blockHorizontalSeparation,
    portSize
} from '../constants';
import placeNodes from '../util/placeNodes';
import {selectLink} from '../actions';
import {deleteNode, deleteLink} from '../larissa/redux';
import portSeparation from '../util/portSeparation';

@connect((state) => {
    return {
        blockTypes: state.blockTypes,
        selectedNode: state.pipelineUI.selectedNode,
        selectedLink: state.pipelineUI.selectedLink,
        grid: state.pipelineGrid,
        graph: Graph.fromJSON(JSON.stringify(state.pipelineUI.graph))
    };
}, {
    deleteNode,
    deleteLink,
    selectLink
})
export default class Pipeline extends Component {
    render() {
        const blockTypes = this.props.blockTypes;
        const grid = this.props.grid;
        const graph = this.props.graph;
        const nodes = [];
        const lines = [];
        // todo create nodes and lines
        return (
            <div style={{position: 'relative', height: '100%'}}>
                <SvgLinks lines={lines} onClick={this.props.selectLink} selected={this.props.selectedLink} />
                {nodes}
            </div>
        );
    }

    @keydown('delete')
    deleteKeyPressed() {
        if (this.props.selectedNode) {
            this.props.deleteNode(this.props.selectedNode);
        } else if (this.props.selectedLink) {
            this.props.deleteLink(this.props.selectedLink);
        }
    }
}

function getHeight(nNodes) {
    return nNodes * blockHeight + (nNodes - 1) * blockVerticalSeparation;
}

function getPorts(node, type, blockTypes) {
    if (node.kind === 'block') {
        return findBlockType(blockTypes, node.type)[type];
    } else if (node.kind === 'pipeline' || node.kind === 'map-loop') {
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
