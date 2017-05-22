import {createElement} from 'react';
import {Toolbar, ToolbarGroup, RaisedButton} from 'material-ui';
import pipeline from '../larissa/pipeline';

export default function () {
    return (
        <Toolbar>
            <ToolbarGroup firstChild={true}>
            </ToolbarGroup>
            <ToolbarGroup>
                <RaisedButton label="RUN" primary={true} onClick={() => pipeline.run()} />
                <RaisedButton label="RESET" primary={true} onClick={() => pipeline.reset()} />
            </ToolbarGroup>
        </Toolbar>
    );
}
