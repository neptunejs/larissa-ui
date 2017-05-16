import {createElement, Component} from 'react';
import {connect} from 'react-redux';

import Pipeline from './PipelineDroppable';

class MainContent extends Component {
    render() {
        return (
            <div style={{flex: 0.99, marginLeft: this.props.drawerOpen ? 256 : 0}}>
                <Pipeline />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        drawerOpen: state.drawer.open
    };
};

export default connect(mapStateToProps)(MainContent);
