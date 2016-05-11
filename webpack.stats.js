
var config = require('./webpack.config'),
    webpack = require('webpack'),
    path = require('path'),
    Visualizer = require('webpack-visualizer-plugin');

config.output.path = path.join(__dirname, 'reports');
config.output.publicPath = '/';
config.output.filename = 'app.js';

config.plugins.push(new Visualizer({ filename: 'webpackstats.html'}));

module.exports = config;
