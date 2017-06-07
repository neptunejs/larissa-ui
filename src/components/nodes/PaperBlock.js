import {createElement} from 'react';
import {Paper} from 'material-ui';
import StatusBar from './StatusBar';
import Ports from './Ports';

export const PaperBlock = ({style, status, selected, node, inputs, outputs, title, subtitle, handleClick, handleDoubleClick}) => {
    return (
        <Paper
            style={{...style, border: selected ? 'solid 1px blue' : null}}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <Ports node={node} type="input" value={inputs}/>
            <Ports node={node} type="output" value={outputs}/>
            <StatusBar status={status}/>
            <div style={{padding: 5}}>
                <h3 style={{marginTop: 0}}>{title}</h3>
                <h5>{subtitle}</h5>
            </div>
        </Paper>
    );
};

export default PaperBlock;
