import {createElement, Component} from 'react';
import {connect} from 'react-redux';

import {drawerWidth, inspectorWidth} from '../constants';

import Pipeline from './PipelineDroppable';
import PipelineToolbar from './PipelineToolbar';

const baseStyle = {display: 'flex', flexDirection: 'column', flex: 0.99};

class MainContent extends Component {
    render() {
        return (
            <div style={{
                ...baseStyle,
                marginLeft: this.props.drawerOpen ? drawerWidth : 0,
                marginRight: this.props.inspectorOpen ? inspectorWidth : 0
            }}>
                <PipelineToolbar />
                <Pipeline />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        drawerOpen: state.drawer.open,
        inspectorOpen: state.drawer.inspectorOpen
    };
};

export default connect(mapStateToProps)(MainContent);
