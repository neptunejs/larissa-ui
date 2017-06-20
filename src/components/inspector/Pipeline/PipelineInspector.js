import {createElement} from 'react';
import PipelineLinkInterfaces from './PipelineLinkInterfaces';
import PipelineLinkOptions from './PipelineLinkOptions';
import {Tabs, Tab} from 'material-ui';
import NodeOptions from '../NodeOptions';

const PipelineInspector = (props) => {
    return (
        <Tabs value={props.tab} onChange={props.onTabChange}>
            <Tab label="General" value="general">
                <NodeOptions
                    node={props.node.node}
                />
            </Tab>
            <Tab label="Pipeline" value="pipeline">
                <PipelineLinkInterfaces
                    node={props.node}
                />
                <PipelineLinkOptions
                    node={props.node}
                    graph={props.pipeline.graph}
                />
            </Tab>
        </Tabs>
    );
};

export default PipelineInspector;
