import {createElement, Component} from 'react';
import {ScatterPlot} from 'react-d3-components';
import {inspectorWidth} from '../../../../constants';
import {SelectField, MenuItem} from 'material-ui';
var tooltipScatter = function (x, y) {
    return 'x: ' + x + ' y: ' + y;
};
import {groupBy} from 'lodash-es';

class TableRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIdx: 0,
            yIdx: 1,
            colorIdx: -1
        };
    }

    onColorChange(event, idx) {
        this.setState({
            colorIdx: idx - 1
        });
    }

    onXChange(event, idx) {
        this.setState({
            xIdx: idx
        });
    }

    onYChange(event, idx) {
        this.setState({
            yIdx: idx
        });
    }

    render() {
        const data = this.props.data;

        const xAccessor = (row) => row[this.state.xIdx];
        const yAccessor = (row) => row[this.state.yIdx];
        let chartData = [];
        let grouped = groupBy(data.data, row => {
            return row[this.state.colorIdx];
        });

        for (let key in grouped) {
            chartData.push({
                label: key,
                values: grouped[key]
            });
        }

        // compute axis zeros
        // const xMin = Math.min(...(data.data.map(d => d[0])));
        // const yMin = Math.min(...(data.data.map(d => d[1])));

        // console.log(xMin, yMin);


        return (
            <div>
                <SelectField
                    // style={{width: '100%'}}
                    floatingLabelText="Select X"
                    value={this.state.xIdx}
                    onChange={this.onXChange.bind(this)}
                >
                    {data.headers.map(renderLabel)}
                </SelectField>
                <SelectField
                    // style={{width: '100%'}}
                    floatingLabelText="Select Y"
                    value={this.state.yIdx}
                    onChange={this.onYChange.bind(this)}
                >
                    {data.headers.map(renderLabel)}
                </SelectField>
                <SelectField
                    style={{width: '100%'}}
                    floatingLabelText="Select color"
                    value={this.state.colorIdx}
                    onChange={this.onColorChange.bind(this)}
                >
                    <MenuItem value={-1} key={-1} primaryText="None" />
                    {data.headers.map(renderLabel)}
                </SelectField>
                <ScatterPlot
                    data={chartData}
                    x={xAccessor}
                    y={yAccessor}
                    width={inspectorWidth - 20}
                    height={inspectorWidth * 2 / 3}
                    tooltipHtml={tooltipScatter}
                    xAxis={{zero: 0, label: data.headers[this.state.xIdx]}}
                    yAxis={{zero: 0, label: data.headers[this.state.yIdx]}}
                />
            </div>
        );

    }
}

function renderLabel(label, idx) {
    return (
        <MenuItem
            value={idx} key={idx} primaryText={label}
        />
    );
}

export default TableRenderer;
