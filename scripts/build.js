// Build script for CI validation
const fs = require('fs');
const path = require('path');

// Read package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Validate tests
const testResults = fs.readdirSync('src/scripts/test.js');
if (testResults.length === 0) {
  console.error('No tests found');
  process.exit(1);
}

// Validate build
const buildResults = fs.readdirSync('src/scripts/build.js');
if (buildResults.length === 0) {
  console.error('No build found');
  process.exit(1);
}
