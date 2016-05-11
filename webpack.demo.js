var path = require('path'),
    webpack = require('webpack'),
    webpackDevServer = require("webpack-dev-server"),
    config = require("./webpack.config.js"),
    open = require('open'),
    devPort = 3600;

config.entry = [
  path.join(__dirname, 'demo/index.js')
];
// Define custom output
config.output = {
  path: path.join(__dirname, 'demo'),
  filename: 'bundle.js',
  publicPath: '/'
};

config.devtool = 'eval';

if (process.env.NODE_ENV === 'production') {
  config.externals = {};
  module.exports = config;
} else {

  config.entry.push(
  'webpack/hot/only-dev-server',
  'webpack-dev-server/client?http://localhost:'+devPort+'/')

  // Load demo files
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());

  // Define compiler
  var compiler = webpack(config);

  // Define server
  var server = new webpackDevServer(compiler, {
    hot:false,
    inline:true,
    reload:true,
    contentBase:path.join(__dirname, 'demo')
  });

  // Start server
  server.listen(devPort);

  // Open page
  open('http://localhost:'+devPort);
}
