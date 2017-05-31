import {createElement} from 'react';
import {Drawer, AppBar} from 'material-ui';
import {connect} from 'react-redux';
import BlockOptions from './BlockOptions';
import {setBlockOptions} from '../larissa/redux';

function renderOptions(props) {
    switch (props.node.kind) {
        case 'block':
            return <BlockOptions node={props.node} onChange={(options) => props.setBlockOptions({id: props.node.id, options})} />;
        default:
            return <div>Unable to render this kind of node</div>;
    }
}

const SecondaryDrawer = props => {
    return (
        <Drawer width={400} open={props.inspectorOpen} openSecondary={true}>
            <AppBar
                title="Options"
                iconElementLeft={<div></div>}
            >
            </AppBar>
            {renderOptions(props)}
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        node: state.pipelineUI.selectedNode,
        inspectorOpen: state.drawer.inspectorOpen
    };
};

export default connect(mapStateToProps, {setBlockOptions})(SecondaryDrawer);
