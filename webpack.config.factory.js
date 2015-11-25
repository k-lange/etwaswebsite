var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var srcPath = path.resolve(__dirname, 'src');

module.exports = function (options) {
    options = options || {};

    var dist = options.dist;
    var renderer  = options.renderer;
    var filename = renderer ? 'server.js' : 'index.js';

    var config = {
        entry: {
            'app': './src/' + filename
        },
        output: {
            path: path.resolve(__dirname, './dist/'),
            filename: filename,
            library: renderer,
            libraryTarget: renderer ? 'commonjs2' : 'var'
        },
        devtool: dist ? 'source-map' : '#eval',
        resolve: {
            root: path.resolve(__dirname, './src/'),
            extensions: ['', '.js']
        },
        module: {
            loaders: [
                {
                    test: /\.md$/,
                    loader: 'markdown-with-front-matter'
                },
                {
                    test: /\.woff$/,
                    loader: 'url'
                },
                {
                    test: /\.jsx?$/,
                    include: srcPath,
                    loaders: ['babel']
                },
                {
                    test: /\.less$/,
                    include: srcPath,
                    loader: ExtractTextPlugin.extract('style', ['css' + (dist ? '?minimize' : ''), 'less'])
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
            inline: true,
            progress: true
        },
        plugins: [
            new ExtractTextPlugin('styles.css')
        ]
    };

    if (dist) {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false
                }
            })
        );
    }

    return config;
};
