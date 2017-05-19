import env from './environment';

const pipeline = env.newPipeline();
pipeline.newNode('number', {value: 5});

export default pipeline;