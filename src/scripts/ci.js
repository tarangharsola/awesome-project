const { spawn } = require('child_process');
const { execSync } = require('child_process');

module.exports = function ci() {
  const build = spawn('npm', ['run', 'build']);
  const test = spawn('npm', ['run', 'test']);

  build.stdout.on('data', (data) => {
    console.log(`Build output: ${data}`);
  });

  test.stdout.on('data', (data) => {
    console.log(`Test output: ${data}`);
  });
};