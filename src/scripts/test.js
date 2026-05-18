const { spawn } = require('child_process');
const { execSync } = require('child_process');

module.exports = function test() {
  const test = spawn('jest');

  test.stdout.on('data', (data) => {
    console.log(`Test output: ${data}`);
  });
};