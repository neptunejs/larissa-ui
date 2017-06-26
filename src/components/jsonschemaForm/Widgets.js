import {createElement} from 'react';
import {TextField, Toggle, SelectField, MenuItem} from 'material-ui';


export const TextWidget = (props) => {
    const type = props.schema.type === 'number' ? 'number' : 'text';
    return (
        <TextField
            id={props.id}
            value={props.value || ''}
            floatingLabelText={props.label}
            onChange={(event) => props.onChange(event.target.value)}
            multiLine={props.schema.multiLine}
            type={type}
        />
    );
};

export const CheckboxWidget = (props) => {
    return (
        <Toggle
            labelPosition="right"
            id={props.id}
            label={props.label}
            toggled={props.value}
            onToggle={(event, toggled) => props.onChange(toggled)}
        />
    );
};

export const SelectWidget = (props) => {
    const {value, onChange, options} = props;
    return (
        <SelectField
            value={value}
            onChange={(event, index, value) => {
                onChange(value);
            }}
        >
            {options.enumOptions.map(({value, label}, i) => {
                return (
                    <MenuItem
                        value={value}
                        key={i}
                        primaryText={label}
                    />
                );
            })}
        </SelectField>
    );
};
