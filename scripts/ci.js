// Import required modules
const childProcess = require('child_process');

// Define CI script
module.exports = async () => {
  // Run tests and build script
  const testResult = await childProcess.execSync('npm test');
  const buildResult = await childProcess.execSync('npm run build');
  // Assert test and build results
  assert.strictEqual(testResult.status, 0);
  assert.strictEqual(buildResult.status, 0);
};