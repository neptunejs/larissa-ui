import {createElement} from 'react';
import BlockOptions from './BlockOptions';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui';
import {setBlockOptions} from '../../larissa/redux';

const BlockInspector = (props) => {
    return (
        <Tabs>
            <Tab label="Block">
                <BlockOptions
                    node={props.node.node}
                    onChange={(options) => props.setBlockOptions({id: props.node.node.id, options})}
                />
            </Tab>
        </Tabs>
    );
};

export default connect(null, {setBlockOptions})(BlockInspector);