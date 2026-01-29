const { spawn } = require('child_process');
const { resolve } = require('path');

module.exports = function() {
  const testScript = resolve(__dirname, '../src/components/__tests__/index.ts');
  const testRunner = spawn('jest', [testScript], { shell: true });

  testRunner.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  testRunner.stderr.on('data', (data) => {
    console.error(data.toString());
  });
};