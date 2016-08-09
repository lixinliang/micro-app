'use strict';

let path = require('path');
let webpack = require('webpack');
let extractTextPlugin = require('extract-text-webpack-plugin');

let entry = require('./entry.js');

module.exports = {
    devtool : '#source-map',
    entry : entry,
    output : {
        filename : '[name].js',
        publicPath : '',
    },
    extensions : ['.vue', '.js', '.json', '.scss', '.html'],
    resolve : {
        alias : {
            'micro-app' : path.join(__dirname, '../src/micro-app.js'),
        },
    },
    module : {
        loaders : [
            {
                test : /\.vue$/,
                loader : 'vue',
            },
            {
                test : /\.html$/,
                loader : 'vue-html',
            },
            {
                test : /\.(png|jpg|gif|svg)$/,
                loader : 'url?limit=10240&name=../image/[name].[ext]?[hash]',
            },
            {
                test : /\.css$/,
                loader : extractTextPlugin.extract('style', 'css'),
            },
            {
                test : /\.scss$/,
                exclude : /style_modules/,
                loader : extractTextPlugin.extract('style', 'css?localIdentName=[local]___[hash:base64:5]!autoprefixer?safe=true!sass?sourceMap!'),
            },
            {
                test : /\.scss$/,
                include : /style_modules/,
                loaders : ['css', 'autoprefixer', 'sass'],
            },
            {
                test : /\.js$/,
                exclude : /(node_modules|bower_components|dist)/,
                // include : path.join(__dirname, './demo/**/entry/'),
                loader : 'babel',
                query : {
                    presets : ['es2015', 'stage-0'],
                    // plugins: ['transform-runtime'],
                },
            },
        ],
    },
    plugins : [
        new extractTextPlugin('[name].css'),
    ],
    vue : {
        loaders : {
            sass : extractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass?indentedSyntax'),
            scss : extractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 version!sass'),
        },
    },
};
