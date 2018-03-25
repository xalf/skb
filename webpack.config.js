var path = require('path');
var webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  //context: path.join(__dirname, "src"),
  //entry: "app.js",
  // output: {
  //   path: path.resolve(__dirname, 'dist/js/'),
  //   filename: 'bundle.js'
  // },
  devtool: 'eval-source-map',
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
      }
    ]    
  },
  watch: true,
  plugins: [
  	new ExtractTextPlugin({
      filename: 'style/[name].css'
      // filename:  (getPath) => {
      //   return getPath('js/[name].css').replace('js', '../style');
      // }
    })
  ],
  
};