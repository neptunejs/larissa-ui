import {createElement} from 'react';
import {Paper} from 'material-ui';

import StatusBar from './StatusBar';
import Ports from './Ports';
import {FINISHED} from '../../constants';
import * as renderers from '../renderers';

export const PaperBlock = ({style, status, selected, node, inputs, nodeOutputs, outputs, title, subtitle, handleClick, handleDoubleClick}) => {
    let result;
    if (status === FINISHED && nodeOutputs && nodeOutputs.size === 1) {
        const output = nodeOutputs.values().next().value;
        const value = output.getValue();
        if (value) {
            const Component = renderers[output.getType()];
            if (Component) {
                result = (
                    <Component value={value}/>
                );
            }
        } else {
            console.error('value is undefined. this should not happen...');
        }
    }

    return (
        <Paper
            style={{...style, border: selected ? 'solid 1px blue' : null}}
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
