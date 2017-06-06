import {createElement} from 'react';
import {Drawer, AppBar} from 'material-ui';
import {connect} from 'react-redux';
import BlockInspector from './BlockInspector';
import PipelineInspector from './PipelineInspector';
import {inspectorWidth} from '../../constants';

function renderOptions(props) {

    switch (props.node.node.kind) {
        case 'block':
            return <BlockInspector node={props.node} />;
        case 'pipeline':
            return <PipelineInspector node={props.node} />;
        default:
            return <div>Unable to render this kind of node</div>;
    }
}

const SecondaryDrawer = props => {
    return (
        <Drawer width={inspectorWidth} open={props.inspectorOpen} openSecondary={true}>
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

export default connect(mapStateToProps)(SecondaryDrawer);
