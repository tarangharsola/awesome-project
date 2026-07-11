const { spawnSync } = require('child_process');
const { build } = require('./scripts/test);

module.exports = function() {
  build();
};