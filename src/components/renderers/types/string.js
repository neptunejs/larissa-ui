import {createElement} from 'react';

export function string({value}) {
    return <span>{value.substring(0, 20) + (value.length > 20 ? '...' : '')}</span>;
}
