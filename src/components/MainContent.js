import {createElement, Component} from 'react';
import {connect} from 'react-redux';

import Pipeline from './PipelineDroppable';
import PipelineToolbar from './PipelineToolbar';

const baseStyle = {display: 'flex', flexDirection: 'column', flex: 0.99};

class MainContent extends Component {
    render() {
        return (
            <div style={{...baseStyle, marginLeft: this.props.drawerOpen ? 256 : 0}}>
                <PipelineToolbar />
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
