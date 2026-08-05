const { test } = require('tap');
const { join } = require('path');
const { resolve } = require('path');

const buildDir = join(__dirname, "build");
const testDir = join(__dirname, "test");

test("Build script runs successfully", async t => {
  const buildCommand = "npm run build";
  const buildResult = spawnSync(buildCommand, { shell: true });

  t.ok(buildResult.status === 0, "Build script should exit with code 0");
});

test("Test script runs successfully", async t => {
  const testCommand = "npm run test";
  const testResult = spawnSync(testCommand, { shell: true });

  t.ok(testResult.status === 0, "Test script should exit with code 0");
});