const { execSync } = require('child_process');
const { test } = require('tap');

module.exports = function (tap) {
  tap.test('build script', function (t) {
    const buildScript = require('./build.js');
    t.equal(buildScript(), 0, 'build script should return 0');
    t.end();
  });
};