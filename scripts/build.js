// Import required modules
const childProcess = require('child_process');

// Define build script
module.exports = async () => {
  // Run build process
  const buildResult = await childProcess.execSync('webpack');
  // Assert build result
  assert.strictEqual(buildResult.status, 0);
};