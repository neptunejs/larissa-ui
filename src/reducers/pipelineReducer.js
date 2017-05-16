import env from '../environment';

const pipeline = env.newPipeline();
const number = pipeline.newNode('number', {value: 1});
const number2 = pipeline.newNode('number', {value: 2});
const sum = pipeline.newNode('sum');
pipeline.connect(number, sum);
pipeline.connect(number2, sum);

export default function (state = pipeline) {
    return state;
}
