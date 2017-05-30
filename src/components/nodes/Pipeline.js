import {createElement, Component} from 'react';
import Paper from 'material-ui/Paper';

import StatusBar from '../StatusBar';
import Ports from '../Ports';
import {selectNode, selectPipeline} from '../../actions/index';
import {connect} from 'react-redux';

class Pipeline extends Component {
    render() {
        const {
            node: info,
            selected,
            style: blockStyle,
            width, height
        } = this.props;
        return (
            <Paper style={{...blockStyle, border: selected ? 'solid 1px blue' : null}}
                   onClick={this.handleClick.bind(this)}>
                <StatusBar status={info.status} />
                <Ports node={info.id} type="input" value={info.inputs} width={width}
                       height={height} />
                <Ports node={info.id} type="output" value={info.outputs} width={width}
                       height={height} />
                <div style={{padding: 5}}>
                    <h4 style={{marginTop: 0}}>{info.title}</h4>
                </div>
            </Paper>
        );
    }

    handleClick(event) {
        event.stopPropagation();
        this.props.selectNode(this.props.node);
        this.props.selectPipeline(this.props.node);
    }
}

export default connect(null, {selectPipeline, selectNode})(Pipeline);