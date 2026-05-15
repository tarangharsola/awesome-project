const childProcess = require('child_process');
const fs = require('fs');

module.exports = function() {
  // Build the app
  childProcess.execSync('npm run build');
};