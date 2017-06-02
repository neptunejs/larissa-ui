import {Environment} from 'larissa';
import imagePlugin from 'larissa-plugin-nodes-image-js';
import logicPlugin from 'larissa-plugin-nodes-logic';

const env = new Environment();
env.loadPlugin(imagePlugin());
env.loadPlugin(logicPlugin());

export default env;
