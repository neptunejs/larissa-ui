import {createElement, Component} from 'react';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';

import {selectNode, selectBlock} from '../../actions/index';

import Ports from './Ports';
import StatusBar from './StatusBar';

class Block extends Component {
    render() {
        const {
            node: info,
            blockType,
            selected,
            style: blockStyle
        } = this.props;
        return (
            <Paper style={{...blockStyle, border: selected ? 'solid 1px blue' : null}}
                   onClick={this.handleClick.bind(this)}>
                <Ports node={info.id} type="input" value={blockType.inputs} />
                <Ports node={info.id} type="output" value={blockType.outputs} />
                <StatusBar status={info.status} />
                <div style={{padding: 5}}>
                    <h4 style={{marginTop: 0}}>{blockType.label || blockType.name}</h4>
                </div>
            </Paper>
        );
    }

    handleClick(event) {
        event.stopPropagation();
        this.props.selectNode(this.props.node);
        this.props.selectBlock(this.props.node);
    }
}

export default connect(null, {selectNode, selectBlock})(Block);
