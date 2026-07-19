// Import required modules
const childProcess = require('child_process');
const fs = require('fs');

// Define test and build functions
function runTests() {
  console.log('Running tests...');
  childProcess.execSync('jest');
}

function buildApp() {
  console.log('Building app...');
  childProcess.execSync('webpack');
}

// Run tests and build app
runTests();
buildApp();