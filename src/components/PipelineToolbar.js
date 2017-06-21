import {createElement} from 'react';
import {Toolbar, ToolbarGroup, RaisedButton} from 'material-ui';
import {connect} from 'react-redux';

import {runPipeline, resetPipeline, createPipeline, createLoop, dumpJson, runNode, resetNode} from '../larissa/redux';
import {toggleInspector} from '../actions';
import NodeHistory from './NodeHistory';

const PipelineToolbar = props => {
    return (
        <Toolbar>
            <ToolbarGroup firstChild={true}>
                <RaisedButton label="INSERT PIPELINE" primary={true} onClick={() => props.createPipeline()} />
                <RaisedButton label="INSERT LOOP" primary={true} onClick={() => props.createLoop()} />
                <RaisedButton
                    label={props.selectedNode ? 'RUN NODE' : 'RUN PIPELINE'}
                    primary={true}
                    onClick={() => {
                        if (props.selectedNode) {
                            props.runNode(props.selectedNode);
                        } else {
                            props.runPipeline();
                        }
                    }}
                />
                <RaisedButton
                    label={props.selectedNode ? 'RESET NODE' : 'RESET PIPELINE'}
                    primary={true}
                    onClick={() => {
                        if (props.selectedNode) {
                            props.resetNode(props.selectedNode);
                        } else {
                            props.resetPipeline();
                        }
                    }}
                />
                <RaisedButton label="DUMP JSON" primary={true} onClick={() => props.dumpJson()} />
            </ToolbarGroup>
            <ToolbarGroup>
                <NodeHistory />
            </ToolbarGroup>
            <ToolbarGroup lastChild={true}>
                <RaisedButton label="INSPECTOR" primary={true} onClick={() => props.toggleInspector()} />
            </ToolbarGroup>
        </Toolbar>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedNode: state.pipelineUI.selectedNode
    };
};

export default connect(mapStateToProps, {
    runPipeline,
    resetPipeline,
    createPipeline,
    createLoop,
    toggleInspector,
    dumpJson,
    runNode,
    resetNode
})(PipelineToolbar);
