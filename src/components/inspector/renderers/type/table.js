import {createElement, Component} from 'react';
import {ScatterPlot} from 'react-d3-components';
import {inspectorWidth} from '../../../../constants';
import {SelectField} from 'material-ui';
var tooltipScatter = function (x, y) {
    return 'x: ' + x + ' y: ' + y;
};

class TableRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: null;
        }
    }
    render() {
        const data = this.props.data;

        let chartData = [
            {
                label: 'A',
                values: data.data.map(d => ({x: d[0], y: d[1]}))
            }
        ];

        // compute axis zeros
        // const xMin = Math.min(...(data.data.map(d => d[0])));
        // const yMin = Math.min(...(data.data.map(d => d[1])));

        // console.log(xMin, yMin);

        <SelectField style={{width: '100%'}} floatingLabelText="Select" value={this.state.color}
                     onChange={this.onColorChange.bind(this)}>
            {this.props.candidates.map(renderCandidate)}
        </SelectField>

        return (
            <div>
                <SelectField />
                <ScatterPlot
                    data={chartData}
                    width={inspectorWidth}
                    height={inspectorWidth}
                    tooltipHtml={tooltipScatter}
                    xAxis={{zero: 0, label: data.headers[0]}}
                    yAxis={{zero: 0, label: data.headers[1]}}
                />
            </div>
        );

    }
}

function renderCandidate(candidate) {
    return (
        <MenuItem value={candidate.info.id} key={candidate.info.id} primaryText={`${candidate.node.title} - ${candidate.info.name}`} />
    );
}


export default TableRenderer;