import {createElement} from 'react';
import NodeList from './NodeList';
import {Drawer, AppBar, IconButton} from 'material-ui';
import {connect} from 'react-redux';
import {nodesToTree} from '../selectors';
import {closeDrawer} from '../actions/index';

import predefinedPipelines from '../larissa/predefinedPipelines';

const MainDrawer = props => {
    return (
        <Drawer open={props.open}>
            <AppBar
                title="larissa"
                iconElementLeft={<IconButton onClick={props.closeDrawer} iconClassName="material-icons">arrow_back</IconButton>}
            >
            </AppBar>
            <NodeList tree={props.tree} pipelines={predefinedPipelines} />
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        open: state.drawer.open,
        tree: nodesToTree(state)
    };
};

export default connect(mapStateToProps, {closeDrawer})(MainDrawer);
