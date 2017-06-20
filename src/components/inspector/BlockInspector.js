import {createElement} from 'react';
import BlockOptions from './BlockOptions';
import NodeOptions from './NodeOptions';
import Renderer from './renderers/Renderer';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui';
import {setBlockOptions} from '../../larissa/redux';

const BlockInspector = (props) => {
    return (
        <Tabs value={props.tab} onChange={props.onTabChange}>
            <Tab label="General" value="general">
                <NodeOptions
                    node={props.node.node}
                />
            </Tab>
            <Tab label="Block" value="block">
                <BlockOptions
                    node={props.node.node}
                    onChange={(options) => props.setBlockOptions({id: props.node.node.id, options})}
                />
            </Tab>
            <Tab label="View" value="view">
                <Renderer />
            </Tab>
        </Tabs>
    );
};

export default connect(null, {setBlockOptions})(BlockInspector);
