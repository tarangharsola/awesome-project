// Import required modules
const webpack = require('webpack');
const path = require('path');

// Define build configuration
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.tsx?$/, loader: 'ts-loader'
      }
    ]
  }
};