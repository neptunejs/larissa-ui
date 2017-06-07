import {createElement} from 'react';
import PipelineOptions from './PipelineOptions';
import {Tabs, Tab} from 'material-ui';
import NodeOptions from './NodeOptions';

const BlockInspector = (props) => {
    return (
        <Tabs>
            <Tab label="General">
                <NodeOptions
                    node={props.node.node}
                />
            </Tab>
            <Tab label="Pipeline">
                <PipelineOptions
                    node={props.node}
                />
            </Tab>
        </Tabs>
    );
};

export default BlockInspector;
