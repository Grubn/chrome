var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

var config = {
  devtool: 'eval',
  entry: [
    './app/containers/App.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app'),
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.scss|\.css)$/,
        loader: 'style!css!sass'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};

var env = process.env['NODE_ENV'];

if (env && env.match(/production/)) {
  config = Object.assign({}, config, {
    plugins: [
      ...config.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
      }),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    ]
  })
}

module.exports = config;
