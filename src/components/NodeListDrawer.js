import {createElement} from 'react';
import NodeList from './NodeList';
import {Drawer} from 'material-ui';
import {connect} from 'react-redux';
import {nodesToTree} from '../selectors';

const NodeListDrawer = props => {
    return (
        <Drawer open={props.open}>
            <NodeList tree={props.tree} />
        </Drawer>
    );
};

const mapStateToProps = state => {
    return {
        open: state.drawer.open,
        tree: nodesToTree(state)
    };
};

export default connect(mapStateToProps)(NodeListDrawer);
