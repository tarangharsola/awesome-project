const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const config = {
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
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};

webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats.toString());
  }
});