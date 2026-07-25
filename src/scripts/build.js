const { spawnSync } = require('child_process');
const { join } = require('path');
const { build } = require('webpack');

module.exports = function build() {
  console.log('Building application...');
  const webpackConfig = {
    entry: join(__dirname, 'index.tsx'),
    output: {
      path: join(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  };
  const result = build(webpackConfig);
  console.log('Build complete.');
};