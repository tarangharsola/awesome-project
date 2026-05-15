const childProcess = require('child_process');
const fs = require('fs');

module.exports = function() {
  // Run tests
  childProcess.execSync('./src/scripts/ci.js');
};