// Build script for CI validation
const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Build and test
fs.mkdirSync('build', { recursive: true });
fs.copyFileSync('public/index.html', 'build/index.html');
fs.copyFileSync('public/favicon.svg', 'build/favicon.svg');
fs.copyFileSync('public/robots.txt', 'build/robots.txt');

// Run tests
const testResults = require('child_process').spawnSync('node', ['src/scripts/test.js'], { stdio: 'inherit' });
if (testResults.status !== 0) {
  process.exit(1);
}