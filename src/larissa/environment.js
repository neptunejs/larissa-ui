import {Environment} from 'larissa';
import imagePlugin from 'larissa-plugin-nodes-image-js';

const env = new Environment();
env.loadPlugin(imagePlugin());

export default env;
