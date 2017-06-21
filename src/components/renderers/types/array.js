import {createElement} from 'react';

export function array({value}) {
    if (Array.isArray(value)) {
        const more = value.length > 5;
        return <span>{value.slice(0, 5).join(', ') + (more ? ', ...' : '')}</span>;
    } else {
        return null;
    }
}
