import {createElement} from 'react';
import PipelineOptions from './PipelineOptions';
import {Tabs, Tab} from 'material-ui';
import NodeOptions from './NodeOptions';

const BlockInspector = (props) => {
    return (
        <Tabs value={props.tab} onChange={props.onTabChange}>
            <Tab label="General" value="general">
                <NodeOptions
                    node={props.node.node}
                />
            </Tab>
            <Tab label="Pipeline" value="pipeline">
                <PipelineOptions
                    node={props.node}
                />
            </Tab>
        </Tabs>
    );
};

export default BlockInspector;
