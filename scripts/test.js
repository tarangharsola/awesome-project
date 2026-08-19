#!/usr/bin/env node
const { execSync } = require('child_process');

try {
  execSync('npx jest --ci', { stdio: 'inherit' });
  process.exit(0);
} catch (error) {
  console.error('Tests failed:', error);
  process.exit(1);
}
