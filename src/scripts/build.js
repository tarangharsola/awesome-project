const { spawnSync } = require('child_process');
const { resolve } = require('path');

module.exports = function () {
  const buildCommand = spawnSync('webpack', ['--mode', 'production'], { cwd: resolve(__dirname, '..') });
  return buildCommand.status;
};