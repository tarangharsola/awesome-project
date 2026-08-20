#!/usr/bin/env node
const { execSync } = require('child_process');

function run(command) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

try {
  run('node scripts/test.js');
  run('node scripts/build.js');
  console.log('CI passed');
  process.exit(0);
} catch (err) {
  console.error('CI failed');
  process.exit(1);
}
