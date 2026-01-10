const { spawn } = require('child_process');
const { join } = require('path');
const { readFileSync } = require('fs');

module.exports = function build() {
  const buildScript = readFileSync(join(__dirname, 'build.js'), 'utf8');
  const buildProcess = spawn('node', [buildScript]);
  buildProcess.stdout.pipe(process.stdout);
  buildProcess.stderr.pipe(process.stderr);
};