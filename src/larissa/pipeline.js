import env from './environment';
import {updatePipeline} from '../actions/index';
import store from '../store';
const pipeline = env.newPipeline();

pipeline.on('child-status', function () {
    store.dispatch(updatePipeline());
});

pipeline.newNode('number', {value: 5});


export default pipeline;
