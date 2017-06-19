import {createElement} from 'react';
import Paper from 'material-ui/Paper';

import StatusBar from './StatusBar';
import Ports from './Ports';
import {FINISHED, selectedColor} from '../../constants';
import * as renderers from '../renderers';

const selectedBorder = `solid 1px ${selectedColor}`;

export const PaperBlock = ({style, status, selected, node, inputs, nodeOutputs, outputs, title, subtitle, handleClick, handleDoubleClick}) => {
    let result;
    if (status === FINISHED && nodeOutputs && nodeOutputs.size === 1) {
        const output = nodeOutputs.values().next().value;
        const value = output.getValue();
        if (value !== undefined) {
            let Component = renderers[output.getType()];
            if (!Component) Component = renderers[typeof value];
            if (Component) {
                result = (
                    <Component value={value} />
                );
            }
        } else {
            throw new Error('value is undefined. this should not happen...');
        }
    }

    return (
        <Paper
            style={{...style, border: selected ? selectedBorder : null}}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <Ports node={node} type="input" value={inputs} />
            <Ports node={node} type="output" value={outputs} />
            <StatusBar status={status} />
            <div style={{padding: 5}}>
                <h3 style={{margin: 0}}>{title}</h3>
                <h5 style={{margin: 0}}>{subtitle}</h5>
                {result}
            </div>
        </Paper>
    );
};

export default PaperBlock;
