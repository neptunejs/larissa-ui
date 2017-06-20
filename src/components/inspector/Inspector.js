import {createElement} from 'react';
import {Drawer, AppBar} from 'material-ui';
import {connect} from 'react-redux';

import {inspectorWidth} from '../../constants';
import {selectInspectorTab} from '../../actions';

import BlockInspector from './BlockInspector';
import PipelineInspector from './Pipeline/PipelineInspector';

function renderOptions(props) {
    const kind = props.node ? props.node.node.kind : '';
    const tab = props.selectedTabs.get(kind);
    switch (kind) {
        case 'block':
            return <BlockInspector
                node={props.node}
                tab={tab}
                onTabChange={(value) => props.selectInspectorTab('block', value)}
            />;
        case 'pipeline':
            return <PipelineInspector
                node={props.node}
                tab={tab}
                onTabChange={(value) => props.selectInspectorTab('pipeline', value)}
            />;
        case '':
            return null;
        default:
            return <div>Unable to render this kind of node ({kind})</div>;
    }
}

const SecondaryDrawer = props => {
    return (
        <Drawer width={inspectorWidth} open={props.inspectorOpen} openSecondary={true}>
            <AppBar iconElementLeft={<div />} />
            {renderOptions(props)}
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        node: state.pipeline.nodes[state.pipelineUI.selectedNode || state.pipelineUI.currentPipeline],
        inspectorOpen: state.drawer.inspectorOpen,
        selectedTabs: state.drawer.selectedInspectorTabs
    };
};

export default connect(mapStateToProps, {selectInspectorTab})(SecondaryDrawer);
