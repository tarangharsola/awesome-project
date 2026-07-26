// This is a basic build script to validate the app
const webpack = require('webpack');
const path = require('path');

module.exports = function() {
  // Run build
  webpack({
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  });
};