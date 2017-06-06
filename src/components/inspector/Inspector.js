import {createElement} from 'react';
import {Drawer, AppBar} from 'material-ui';
import {connect} from 'react-redux';
import BlockOptions from './BlockOptions';
import PipelineOptions from './PipelineOptions';
import {setBlockOptions} from '../../larissa/redux/index';
import {inspectorWidth} from '../../constants';

function renderOptions(props) {

    switch (props.node.node.kind) {
        case 'block':
            return <BlockOptions node={props.node.node} onChange={(options) => props.setBlockOptions({id: props.node.node.id, options})} />;
        case 'pipeline':
            return <PipelineOptions node={props.node} />;
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

export default connect(mapStateToProps, {setBlockOptions})(SecondaryDrawer);
