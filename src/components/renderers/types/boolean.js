import {createElement} from 'react';

export function boolean({value}) {
    return <span>{value ? 'true' : 'false'}</span>;
}
