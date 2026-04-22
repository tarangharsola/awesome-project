// Run tests and build script
const runTests = () => {
  console.log('Running tests...');
  const testResults = require('./test.js');
  console.log(testResults);
};

const buildApp = () => {
  console.log('Building app...');
  require('./build.js');
};

runTests();
buildApp();