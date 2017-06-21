'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOT_RELOADING = !!process.env.HOT_RELOADING;

const VENDOR_LIBS = [
    'immutable', 'material-ui',
    'react', 'react-dom', 'react-keydown', 'react-redux', 'react-router-dom',
    'redux', 'redux-actions', 'redux-promise-middleware', 'redux-thunk',
    'reselect', 'react-jsonschema-form'
];

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // todo enable when we upgrade to webpack 3
    // new webpack.optimize.ModuleConcatenationPlugin()
];

let outputFilename;

if (process.env.NODE_ENV === 'production') {
    // const BabiliPlugin = require('babili-webpack-plugin');
    // plugins.push(new BabiliPlugin());
    outputFilename = '[name].[chunkhash].js';
} else {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const CircularDependencyPlugin = require('circular-dependency-plugin');
    plugins.push(
        new BundleAnalyzerPlugin(),
        new CircularDependencyPlugin()
    );

    if (HOT_RELOADING) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin()
        );
    }
    outputFilename = '[name].[hash].js';
}

module.exports = {
    entry: {
        bundle: [
            'react-hot-loader/patch',
            'regenerator-runtime/runtime',
            './src/index.js'
        ],
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFilename,
        publicPath: '/larissa-ui/'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                use: 'url-loader',
                test: /\.(jpe?g|png|gif|svg)$/i
            }
        ]
    },
    plugins,
    devtool: 'source-map',
    devServer: {
        hot: HOT_RELOADING,
        compress: true,
        historyApiFallback: true,
        contentBase: './'
    }
};
