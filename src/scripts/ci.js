const { execSync } = require('child_process');
const { resolve } = require('path');
const { existsSync } = require('fs');

module.exports = function ci() {
  const buildScript = resolve(__dirname, '../scripts/build.js');
  if (existsSync(buildScript)) {
    console.log('Running build script...');
    execSync(`node ${buildScript}`);
  } else {
    console.log('Build script not found.');
  }
};