'use strict';
var Webpack = require('webpack');
var path = require('path');
var NpmInstallPlugin = require("npm-install-webpack-plugin");

var mainPath = path.resolve(__dirname, 'public', 'client', 'index.jsx');
var node_path = path.resolve(__dirname, 'node_modules')
// require('babel-polyfill');

const config = {
  entry: [

    //hot style updates

     'webpack/hot/dev-server',
     'webpack-dev-server/client?http://localhost:8080',
    './public/client/index.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    pathinfo: true,
    publicPath: '/build/',
    filename: 'bundle.js',
  },
  debug: true,
  cache: true,
  devtool: 'inline-eval-cheap-source-map',
  // devtool: 'source-map',
  module: {
    loaders: [
      {
        exclude: node_path,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          cacheDirectory: true
        }
      },
      { test: /\.css$/,  loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff", 
       },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]", }
    ]
  },
  
  resolve: {
    extensions: ['', '.js', '.jsx'],
    resolve:[ "node_modules"]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin()
  ]
};

module.exports = config;
