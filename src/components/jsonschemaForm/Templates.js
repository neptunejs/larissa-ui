import {createElement} from 'react';
import {RaisedButton, FlatButton} from 'material-ui';

export const FieldTemplate = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export const ArrayFieldTemplate = (props) => {
    return (
        <div>
            {props.items.map((element, idx) => {
                return (
                    <div style={{margin: 10, display: 'flex'}} key={idx}>
                        <div style={{flex: 2}}>
                            {element.children}
                        </div>
                        <div style={{flex: 1}}>
                            <FlatButton secondary={true} onClick={element.onDropIndexClick(idx)} label="Remove element" />
                        </div>
                    </div>
                );
            })}
            {props.canAdd && <RaisedButton secondary={true} label="Add" onClick={props.onAddClick} />}
        </div>
    );
};

