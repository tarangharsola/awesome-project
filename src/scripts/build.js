const { execSync } = require('child_process');
const webpack = require('webpack');

module.exports = function build() {
  console.log('Building application...');
  execSync('webpack');
};