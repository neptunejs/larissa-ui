import {createElement} from 'react';

export function image({value}) {
    return (
        <div style={{
            backgroundImage: `url(${value.toDataURL()})`,
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: 30
        }} />
    );
}
