import {createElement} from 'react';

import {portSize} from '../../constants';

export default function Square({size = portSize, color = 'black'}) {
    return <div style={{width: size, height: size, backgroundColor: color}} />;
}
