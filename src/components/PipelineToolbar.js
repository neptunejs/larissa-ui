import {createElement} from 'react';
import {Toolbar, ToolbarGroup, RaisedButton} from 'material-ui';
import {connect} from 'react-redux';
import {runPipeline, resetPipeline} from '../larissa/redux';

const PipelineToolbar = props => {
    return (
        <Toolbar>
            <ToolbarGroup firstChild={true}>
            </ToolbarGroup>
            <ToolbarGroup>
                <RaisedButton label="RUN" primary={true} onClick={() => props.runPipeline()} />
                <RaisedButton label="RESET" primary={true} onClick={() => props.resetPipeline()} />
            </ToolbarGroup>
        </Toolbar>
    );
};

export default connect(null, {runPipeline, resetPipeline})(PipelineToolbar);