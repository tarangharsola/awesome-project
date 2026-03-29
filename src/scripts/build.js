// Import required modules
const webpack = require('webpack');
const path = require('path');

// Define the build configuration
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.tsx?$/, use: 'ts-loader', exclude: /node_modules/
      }
    ]
  }
};