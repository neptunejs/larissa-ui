import {createElement, Component} from 'react';
import {DragLayer} from 'react-dnd';
import PropTypes from 'prop-types';
import {ItemTypes} from '../constants';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 1400, // Higher than material-ui drawer
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};

function getItemStyles(props) {
    const {currentOffset} = props;
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    const {x, y} = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform
    };
}

class NodeDragPreview extends Component {
    renderItem(type, item) {
        switch (type) {
            case ItemTypes.BLOCK_NODE:
                return (
                    <div>{item.label} (custom)</div>
                );
            default:
                return <div style={{color: 'red'}}>Undefined drag preview</div>;
        }
    }

    render() {
        const {item, itemType, isDragging} = this.props;
        if (!isDragging) {
            return null;
        }

        return (
            <div style={layerStyles}>
                <div style={getItemStyles(this.props)}>
                    {this.renderItem(itemType, item)}
                </div>
            </div>
        );
    }
}

NodeDragPreview.propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    currentOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

export default DragLayer(collect)(NodeDragPreview);
