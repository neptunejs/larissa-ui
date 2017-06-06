import {createElement} from 'react';
import PipelineOptions from './PipelineOptions';
import {Tabs, Tab} from 'material-ui';

const BlockInspector = (props) => {
    return (
        <Tabs>
            <Tab label="Pipeline">
                <PipelineOptions
                    node={props.node}
                />
            </Tab>
        </Tabs>
    );
};

export default BlockInspector;