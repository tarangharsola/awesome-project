const { execSync } = require('child_process');
const { test } = require('tap');

module.exports = function (tap) {
  tap.test('build script', function (t) {
    const buildScript = require('./build.js');
    const buildResult = buildScript();
    t.ok(buildResult, 'Build script executed successfully');
    t.end();
  });
};