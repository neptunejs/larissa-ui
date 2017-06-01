import evenSeparation from './evenSeparation';
import {portSize, blockHeight} from '../constants';

export default function portSeparation(n) {
    return evenSeparation(n, portSize, blockHeight);
}
