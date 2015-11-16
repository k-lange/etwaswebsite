var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = path.resolve(__dirname, 'src');

module.exports = {
    entry: {
        'app': './src/index.jsx'
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'app.js'
    },
    devtool: '#eval',
    resolve: {
        root: path.resolve(__dirname, './src/'),
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.md$/,
                loader: 'markdown-with-front-matter'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.jsx?$/,
                include: srcPath,
                loaders: ['babel']
            },
            {
                test: /\.less$/,
                include: srcPath,
                loaders: ['style', 'css', 'less']
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        progress: true
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Etwas von Luise'
        })
    ]
};
