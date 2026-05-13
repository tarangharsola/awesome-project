const { execSync } = require('child_process');
const { resolve } = require('path');

module.exports = function ci() {
  const buildScript = resolve(__dirname, '../scripts/build.js');
  const testScript = resolve(__dirname, '../scripts/test.js');

  try {
    execSync(`node ${buildScript}`);
    console.log('Build successful');
  } catch (error) {
    console.error('Build failed:', error);
  }

  try {
    execSync(`node ${testScript}`);
    console.log('Tests successful');
  } catch (error) {
    console.error('Tests failed:', error);
  }
};