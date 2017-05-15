import {createElement} from 'react';

export default function Rectangle({size = 20, color = 'black'}) {
    return <div style={{width: size, height: size, backgroundColor: color}} />;
}
