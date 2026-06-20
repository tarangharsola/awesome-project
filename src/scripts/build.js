const childProcess = require('child_process');
const fs = require('fs');

module.exports = function buildApp() {
  childProcess.execSync('webpack', { stdio: 'inherit' });
};