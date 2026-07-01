// This is a basic build script to compile the app
const { execSync } = require('child_process');

module.exports = function build() {
  // Run build tasks here
  execSync('webpack');
};