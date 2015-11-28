var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = path.resolve(__dirname, 'src');

module.exports = function (options) {
    options = options || {};

    var dist = options.dist;
    var renderer  = options.renderer;
    var filename = renderer ? 'server' : 'index';

    var config = {
        entry: {
            'app': './src/' + filename + '.js'
        },
        output: {
            path: path.resolve(__dirname, './dist/'),
            filename: filename + (renderer ? '' : '.[hash]') + '.js',
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
                    test: /\.(jpg|jpeg|gif|png)$/,
                    loader: 'image-placeholder'
                },
                {
                    test: /\.jsx?$/,
                    include: srcPath,
                    loaders: ['babel']
                },
                {
                    test: /\.less$/,
                    include: srcPath,
                    loader: dist ? ExtractTextPlugin.extract('style', ['css?minimize', 'less']) :
                        'style!css!less'
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
            inline: true,
            progress: true
        },
        plugins: [
            new ExtractTextPlugin('styles.[contenthash].css')
        ]
    };

    if (dist || renderer) {
        process.env.BABEL_ENV = 'production';
    }

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

    if (!renderer) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './assets/index.html'
            })
        );
    }

    return config;
};
