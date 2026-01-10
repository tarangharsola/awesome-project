const { execSync } = require('child_process');
const { join } = require('path');
const { readFileSync } = require('fs');

module.exports = function ci() {
  const buildScript = readFileSync(join(__dirname, 'build.js'), 'utf8');
  const testScript = readFileSync(join(__dirname, 'test.js'), 'utf8');
  const ciScript = `node ${buildScript} && node ${testScript}`;
  execSync(ciScript);
};