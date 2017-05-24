import {createElement} from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import {clearNotification} from '../actions';

const Notifications = ({notifications, clearNotification}) => {
    if (notifications.size === 0) {
        return <Snackbar open={false} message="" />;
    } else {
        const notification = notifications.get(0);
        return (
            <Snackbar
                open={true}
                message={notification.message}
                onRequestClose={clearNotification}
                autoHideDuration={2500}
            />
        );
    }
};

const mapStateToProps = state => {
    return {
        notifications: state.notifications
    };
};

export default connect(mapStateToProps, {clearNotification})(Notifications);
