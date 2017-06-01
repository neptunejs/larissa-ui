'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'immutable', 'material-ui',
    'react', 'react-dom', 'react-keydown', 'react-redux', 'react-router-dom',
    'redux', 'redux-actions', 'redux-promise-middleware', 'redux-thunk',
    'reselect', 'react-schema-form'
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
    })
];

let outputFilename;

if (process.env.NODE_ENV === 'production') {
    // const BabiliPlugin = require('babili-webpack-plugin');
    // plugins.push(new BabiliPlugin());
    outputFilename = '[name].[chunkhash].js'
} else {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    plugins.push(
        new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    );
    outputFilename = '[name].[hash].js';
}

module.exports = {
    entry: {
        bundle: ['regenerator-runtime/runtime', './src/index.js'],
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
        hot: true,
        compress: true,
        historyApiFallback: true,
        contentBase: './'
    }
};
