var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: "js\app.js",
  output: {
    //path: path.resolve(__dirname, './build/js/'),
    path: __dirname + '/dist/js/',
    filename: 'bundle.js'
  },
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
        
      }
    ]    
  },
  watch: true,
  plugins: [
  	//new webpack.optimize.UglifyJsPlugin()
  ],
  
};