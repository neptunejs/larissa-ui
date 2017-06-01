import {createElement} from 'react';
import {Toolbar, ToolbarGroup, RaisedButton} from 'material-ui';
import {connect} from 'react-redux';
import {runPipeline, resetPipeline, createPipeline} from '../larissa/redux';
import {toggleInspector} from '../actions';
import NodeHistory from './NodeHistory';
const PipelineToolbar = props => {
    return (
        <Toolbar>
            <ToolbarGroup firstChild={true}>
                <RaisedButton label="INSERT PIPELINE" primary={true} onClick={() => props.createPipeline()} />
                <RaisedButton label="RUN" primary={true} onClick={() => props.runPipeline()} />
                <RaisedButton label="RESET" primary={true} onClick={() => props.resetPipeline()} />
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

export default connect(null, {runPipeline, resetPipeline, createPipeline, toggleInspector})(PipelineToolbar);
