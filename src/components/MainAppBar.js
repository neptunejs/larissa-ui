import {createElement} from 'react';
import {AppBar, IconButton} from 'material-ui';
import {connect} from 'react-redux';
import {openDrawer} from '../actions/index';

const styles = {
    fontFamily: 'Material Icons'
};
const MainAppBar = props => {
    return (
        <AppBar
            title="larissa"
            iconElementLeft={<IconButton onClick={props.openDrawer} style={{styles}} iconClassName="material-icons">menu</IconButton>}
        />
    );
};

export default connect(null, {openDrawer})(MainAppBar);
