import {Environment} from 'larissa';
import imagePlugin from 'larissa-plugin-nodes-image-js';
import logicPlugin from 'larissa-plugin-nodes-logic';
import mljsPlugin from 'larissa-plugin-nodes-mljs';

const env = new Environment();
env.loadPlugin(imagePlugin());
env.loadPlugin(logicPlugin());
env.loadPlugin(mljsPlugin());

export default env;
