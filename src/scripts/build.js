const { spawnSync } = require('child_process');
const { resolve } = require('path');
const { readFileSync } = require('fs');

module.exports = function () {
  const buildCommand = spawnSync('webpack', ['--mode', 'production', '--config', resolve(__dirname, 'webpack.config.js')]);
  if (buildCommand.status !== 0) {
    throw new Error(`Build failed with exit code ${buildCommand.status}`);
  }
  return true;
};