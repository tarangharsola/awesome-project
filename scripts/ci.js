// Import required modules
const childProcess = require('child_process');
const fs = require('fs');

// Run tests
function runTests() {
  const testResults = childProcess.execSync('jest', { stdio: 'pipe' });
  const testOutput = testResults.toString();
  if (testOutput.includes('FAIL')) {
    process.exit(1);
  }
}

// Run build script
function runBuild() {
  const buildResults = childProcess.execSync('npm run build', { stdio: 'pipe' });
  const buildOutput = buildResults.toString();
  if (buildOutput.includes('error')) {
    process.exit(1);
  }
}

// Run tests and build script
runTests();
runBuild();
