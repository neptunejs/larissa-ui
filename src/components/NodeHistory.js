import {createElement, Component} from 'react';
import {connect} from 'react-redux';
import {setCurrentPipeline} from '../larissa/redux';
import {
    lightBlue500,
    grey500
} from 'material-ui/styles/colors';

const elementStyle = {
    marginLeft: 20, marginRight: 20
};

const activeStyle = {...elementStyle, color: grey500};
const notActiveStyle = {...elementStyle, color: lightBlue500, cursor: 'pointer'};

const PipelineHistoryElement = props => {
    return (
        <span>
            <span
                style={props.active ? activeStyle : notActiveStyle}
                onClick={() => {
                    props.handleClick(props.node);
                }}
            >
                {props.node.title} ({props.node.id.substr(0, 3)})
            </span>
            {props.separator || ''}
        </span>
    );
};

class NodeHistory extends Component {
    render() {
        let before = true;
        return (
            <div>
                {this.props.nodeHistory.map((nodeId, idx) => {
                    const active = this.props.activeNode === nodeId;
                    if (active) before = false;
                    let separator;
                    if (idx === this.props.nodeHistory.size - 1) {
                        separator = '';
                    } else if (before) {
                        separator = '<';
                    } else {
                        separator = '>';
                    }
                    return (
                        <PipelineHistoryElement
                            key={nodeId}
                            node={this.props.nodes[nodeId].node}
                            active={active}
                            separator={separator}
                            handleClick={(node) => {
                                this.props.setCurrentPipeline(node);
                            }}
                        />
                    );
                })}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        nodes: state.pipeline.nodes,
        nodeHistory: state.pipeline.nodeHistory,
        activeNode: state.pipeline.currentNode
    };
};

export default connect(mapStateToProps, {setCurrentPipeline})(NodeHistory);
