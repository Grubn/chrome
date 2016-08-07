var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  devtool: 'eval',
  entry: [
    './app/main.js'
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
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      }
    ]
  },
  postcss: [
    precss()
  ],
  plugins: [
    new ExtractTextPlugin('main.min.css'),
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
    ],
    postcss: [
      ...config.postcss,
      autoprefixer()
    ]
  })
}

module.exports = config;
