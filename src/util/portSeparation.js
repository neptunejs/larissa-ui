import evenSeparation from './evenSeparation';
import {portSize, blockHeight} from '../constants';

const cache = new Map();
for (let i = 0; i < 10; i++) {
    cache.set(i, portSeparation(i));
}

export default function portSeparation(n) {
    return cache.get(n) || evenSeparation(n, portSize, blockHeight);
}
