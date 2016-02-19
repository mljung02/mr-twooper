var path = require('path');
var webpack = require('webpack');

var path = require('path');
var config = {
    devtool: 'source-map',
    debug: true,
    entry: path.resolve(__dirname, 'js/main.js.jsx'),
    output: {
        path: path.resolve(__dirname, 'public/javascripts'),
        filename: 'bundle.js',
        sourceMapFilename: "debugging/bundle.map"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
            loader: 'babel' // The module to load. "babel" is short for "babel-loader"
        }]
    },
    query: {
        presets: ['es2015', 'stage-0', 'react']
    }
};

module.exports = config;