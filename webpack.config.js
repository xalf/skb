var path = require('path');
var webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2', 'react']
          }
        }
        
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader"
          }, {
            loader: "postcss-loader"
          }, {
            loader: "resolve-url-loader"
          }, {
            loader: "sass-loader"
          }]
        })
      },
      {
        test: /\.svg$/i,
        loader: "file-loader?name=\.\./img/[name].[ext]"
      }
    ]    
  },
  //watch: true,
  plugins: [
  	new ExtractTextPlugin({
      filename: 'style/[name].css'
    })
  ],
  
};