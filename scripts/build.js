const { execSync } = require('child_process');
const { startServer } = require('./main');

module.exports = function build() {
  startServer();
  execSync('webpack');
};