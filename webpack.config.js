var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/src/index.js'
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css')
  ],
  module: {
    loaders: [
     {
       loaders: ['babel'],
       include: [
         path.join(__dirname, 'client')
       ],
       test: /\.js$/
     },
     {
       test: /\.css$/,
       loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
     }]
   }
}
