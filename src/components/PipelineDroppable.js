import {createElement, Component} from 'react';
import {DropTarget} from 'react-dnd';
import Pipeline from './Pipeline';
import {ItemTypes} from '../constants';
import {unselectNode} from '../actions/index';
import {createBlock, createPipelineFromJSON} from '../larissa/redux';
import {connect} from 'react-redux';

const types = [ItemTypes.BLOCK_NODE];

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        canDrop: monitor.canDrop(),
        isOverOwner: monitor.isOver({shallow: true}),
        isOver: monitor.isOver()
    };
};

class DropPipeline extends Component {
    render() {
        const {canDrop, isOver} = this.props;
        return this.props.connectDropTarget(
            <div
                style={{flex: 1, position: 'relative', backgroundColor: canDrop && isOver ? '#ddd' : '#fff'}}
                onClick={() => this.props.unselectNode()} >
                <Pipeline />
            </div>
        );
    }
}

const spec = {
    drop(props, monitor) {
        if (!monitor.didDrop()) {
            const item = monitor.getItem();
            if (item.block.kind === 'pipeline') {
                props.createPipelineFromJSON(item.block.value);
            } else {
                props.createBlock(item);
            }
        }
    }
};


export default connect(null, {createBlock, unselectNode, createPipelineFromJSON})(DropTarget(types, spec, collect)(DropPipeline));
