const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'bar': './src/bar.js'
    },
    resolve: {
        modules: ['node_modules']
    },
    output: {
        path: path.resolve('./build'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'Code Splitting'
        })
    ]
};
