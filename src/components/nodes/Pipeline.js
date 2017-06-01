import {createElement, Component} from 'react';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';

import {selectNode, selectPipeline} from '../../actions/index';
import {setCurrentPipeline} from '../../larissa/redux';

import StatusBar from './StatusBar';
import Ports from './Ports';

class Pipeline extends Component {
    render() {
        const {
            node: info,
            selected,
            style: blockStyle,
        } = this.props;
        return (
            <Paper style={{...blockStyle, border: selected ? 'solid 1px blue' : null}}
                   onClick={this.handleClick.bind(this)}
                   onDoubleClick={this.handleDblClick.bind(this)}>
                <Ports node={info.id} type="input" value={info.inputs} />
                <Ports node={info.id} type="output" value={info.outputs} />
                <StatusBar status={info.status} />
                <div style={{padding: 5}}>
                    <h4 style={{marginTop: 0}}>{info.title}</h4>
                </div>
            </Paper>
        );
    }

    handleDblClick() {
        this.props.setCurrentPipeline(this.props.node);
    }

    handleClick(event) {
        event.stopPropagation();
        this.props.selectNode(this.props.node);
        this.props.selectPipeline(this.props.node);
    }
}

const mapDispatchToProps = {
    selectPipeline,
    selectNode,
    setCurrentPipeline
};

export default connect(null, mapDispatchToProps)(Pipeline);
