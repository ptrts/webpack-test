const path = require('path');

module.exports = {
    entry: {
        'foo': './src/foo.js',
        'bar': './src/bar.js'
    },
    resolve: {
        modules: ['node_modules']
    },
    output: {
        path: path.resolve('./build'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    }
};
