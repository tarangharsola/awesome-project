// Import required modules
const webpack = require('webpack');
const path = require('path');

// Define build configuration
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.tsx?$/, // .ts and .tsx files
        use: 'ts-loader', // Use ts-loader for TypeScript files
        exclude: /node_modules/ // Exclude node_modules
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'] // Resolve .ts, .tsx, and .js files
  }
};