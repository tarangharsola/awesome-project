const childProcess = require('child_process');

module.exports = function build() {
  // Run build script
  childProcess.execSync('webpack');
};