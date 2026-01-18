const { spawnSync } = require('child_process');
const { build } = require('webpack');

module.exports = function () {
  const result = spawnSync('webpack', ['--mode', 'production']);
  if (result.status !== 0) {
    throw new Error('Webpack build failed');
  }
  return true;
};