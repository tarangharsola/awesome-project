const { execSync } = require('child_process');
const { resolve } = require('path');

module.exports = function() {
  const buildScript = resolve(__dirname, '../scripts/build.js');
  const testScript = resolve(__dirname, '../scripts/test.js');

  execSync(`node ${buildScript}`);
  execSync(`node ${testScript}`);
};