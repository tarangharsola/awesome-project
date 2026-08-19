#!/usr/bin/env node
const { execSync } = require('child_process');

function run(command) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

try {
  run('node scripts/build.js');
  run('node scripts/test.js');
  process.exit(0);
} catch (error) {
  console.error('CI failed:', error);
  process.exit(1);
}
