var baseConfig = require('../webpack.config'),
    path = require('path'),
    glob = require('glob'),
    webpack = require('webpack');

var test = baseConfig;

test.entry = glob.sync(path.join(__dirname, '../src/**/*.spec.js'));

// Necessary config for enzyme
test.externals = {
  'cheerio': 'window',
  'react/addons':true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
}

test.output = {
  path:path.join(__dirname, ''),
  publicPath: '/',
  filename: 'index.compiled.js'
};

module.exports = test;
