const { execSync } = require('child_process');
const buildScript = require('./build.js');

module.exports = function ci() {
  console.log('Running CI script...');
  buildScript();
};