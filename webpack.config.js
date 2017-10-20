const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

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
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new CommonsChunkPlugin({
            names: ['manifest', 'common'].reverse()
        })
    ]
};
