// Import required modules
const childProcess = require('child_process');
const fs = require('fs');

// Run tests and build script
childProcess.execSync('jest');
childProcess.execSync('npm run build');