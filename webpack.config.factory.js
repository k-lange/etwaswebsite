var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var srcPath = path.resolve(__dirname, 'src');

module.exports = function (options) {
    options = options || {};

    var filename = options.server ? 'server.js' : 'index.js';

    return {
        entry: {
            'app': './src/' + filename
        },
        output: {
            path: path.resolve(__dirname, './dist/'),
            filename: filename,
            library: options.server,
            libraryTarget: options.server ? 'commonjs2' : 'var'
        },
        devtool: '#eval',
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
                    loader: ExtractTextPlugin.extract('style', ['css?importLoaders=1', 'less'])
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
};
