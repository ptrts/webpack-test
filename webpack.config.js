const path = require('path');

module.exports = {
    entry: {
        'main': './src/bar.js'
    },
    resolve: {
        modules: ['node_modules']
    },
    output: {
        path: path.resolve('./build/www'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    }
};
