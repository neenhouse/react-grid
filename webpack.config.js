var path = require('path'),
    webpack = require('webpack'),
    rootDir = path.join(__dirname, '');

var config = {
  entry: [
    path.join(__dirname, './src/index')
  ],
  output: {
    path: path.join(rootDir, 'dist'),
    filename: 'react-grid.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],
  resolve: {
    modulesDirectories:[
      'node_modules',
      path.join(rootDir, 'node_modules'),
    ],
    extensions: [
      '',
      '.js',
      '.jsx',
      '.css',
      '.less'
    ]
  },
  module: {
    preLoaders: [
        {
            test: /\.js$/, // include .js files
            exclude: /node_modules/, // exclude any and all files in the node_modules folder
            loader: 'eslint-loader'
        }
    ],
    loaders: [
      {
        test: /\.js[x]?$/,
        loader:'babel-loader',
        include:[
          path.join(rootDir, 'src'),
          path.join(rootDir, 'demo')
        ],
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-stage-0')
          ]
        }
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=assets/[name].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  eslint: {
    configFile: path.join(rootDir, '.eslintrc'),
    quiet:true,
    failOnError:true,
    emitError:true
  }
}

if (process.env.NODE_ENV === 'production') {
  config.externals = {
    react:'React',
    'react-dom':'ReactDOM'
  };
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
  }));
}

module.exports = config;
