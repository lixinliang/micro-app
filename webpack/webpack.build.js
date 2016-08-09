'use strict';

let webpack = require('webpack');
let packageJson = require('../package.json');

const banner =
`@ProjectName ${ packageJson.name }
@Version ${ packageJson.version }
@Author ${ packageJson.author }
@Update ${ new Date }`;

const filename = 'micro-app';
const moduleName = 'microApp';

module.exports = {
    entry : `./src/${ filename }.js`,
    output : {
        path : './dist/',
        filename : `${ filename }.min.js`,
        library : `${ moduleName }`,
        libraryTarget : 'umd',
    },
    extensions : ['.js'],
    module : {
        loaders : [
            {
                test : /\.scss$/,
                loaders : [
                    'to-string',
                    'css',
                    'minifycss?minify',
                    'autoprefixer',
                    'sass',
                ],
            },
            {
                test : /\.js$/,
                exclude : /(node_modules|bower_components)/,
                loader : 'babel',
                query : {
                    presets : ['es2015', 'stage-0'],
                    // plugins: ['transform-runtime'],
                },
            },
        ],
    },
    plugins : [
        new webpack.BannerPlugin(banner),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress : {
        //         warnings : false
        //     },
        // }),
    ],
};
