// Build script for CI validation
const fs = require('fs');
const path = require('path');

// Read package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Build and test
fs.mkdirSync('dist');
fs.copyFileSync('src/index.tsx', 'dist/index.html');
fs.copyFileSync('src/styles/base.css', 'dist/base.css');
fs.copyFileSync('src/scripts/test.js', 'dist/test.js');
fs.copyFileSync('src/scripts/build.js', 'dist/build.js');
