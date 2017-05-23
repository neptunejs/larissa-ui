import {createElement} from 'react';
import {Drawer, AppBar, IconButton} from 'material-ui';
import {connect} from 'react-redux';
import BlockOptions from './BlockOptions';

function renderOptions(node) {
    switch (node.kind) {
        case 'block':
            return <BlockOptions node={node} />;
        default:
            return <div>Unable to render this kind of node</div>;
    }
}

const SecondaryDrawer = props => {
    if (!props.node.id) {
        return null;
    }
    return (
        <Drawer width={400} open={!!props.node.id} openSecondary={true}>
            <AppBar
                title="Options"
                iconElementRight={<IconButton onClick={props.closeDrawer}
                                              iconClassName="material-icons">arrow_forward</IconButton>}
                iconElementLeft={<div></div>}
            >
            </AppBar>
            {renderOptions(props.node)}
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        node: state.pipelineUI.selectedNode
    };
};

export default connect(mapStateToProps)(SecondaryDrawer);
