import {createElement, Component} from 'react';
import {ScatterPlot} from 'react-d3-components';
import {inspectorWidth} from '../../../../constants';

class TableRenderer extends Component {
    render() {
        const data = this.props.data;

        let chartData = [
            {
                label: 'A',
                values: data.data.map(d => ({x: d[0], y: d[1]}))
            }
        ];


        return (
            <ScatterPlot
                data={chartData}
                width={inspectorWidth}
                height={inspectorWidth}
                xAxis={{innerTickSize: 10, label: data.headers[0]}}
                yAxis={{innerTickSize: 10, label: data.headers[1]}}
            />
        );

    }
}

export default TableRenderer;
