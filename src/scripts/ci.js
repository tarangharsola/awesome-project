const { spawnSync } = require('child_process');
const { test } = require('tap');

module.exports = function ci() {
  const buildCommand = "npm run build";
  const testCommand = "npm run test";
  const buildResult = spawnSync(buildCommand, { shell: true });
  const testResult = spawnSync(testCommand, { shell: true });

  if (buildResult.status !== 0) {
    throw new Error(`Build failed with code ${buildResult.status}`);
  }

  if (testResult.status !== 0) {
    throw new Error(`Tests failed with code ${testResult.status}`);
  }
};

module.exports.ci();