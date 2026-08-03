const { spawnSync } = require('child_process');
const { build } = require('./build');

module.exports = function () {
  build(require('tap'));
};