import {createElement, Component} from 'react';
import {DropTarget} from 'react-dnd';
import Pipeline from './Pipeline';
import {ItemTypes} from '../constants';

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
            <div style={{position: 'relative', height: '100%', backgroundColor: canDrop && isOver ? '#ddd' : '#fff'}}>
                <Pipeline />
            </div>
        );
    }
}

const spec = {
    drop(props, monitor) {
        const item = monitor.getItem();
        // TODO: dispatch create block action
        // createBlock(item.block);
    }
};

export default DropTarget(types, spec, collect)(DropPipeline);
