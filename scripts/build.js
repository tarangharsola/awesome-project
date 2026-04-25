// Build script
const fs = require('fs');
const path = require('path');

// Function to build the application
function buildApp() {
  // Copy files
  fs.copyFileSync('src/index.tsx', 'public/index.html');
  // Run tests
  const testResults = require('child_process').spawnSync('node', ['src/scripts/test.js']);
  if (testResults.status !== 0) {
    console.error('Tests failed');
    process.exit(1);
  }
}

// Run build script
buildApp();