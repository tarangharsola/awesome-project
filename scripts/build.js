const childProcess = require('child_process');
const fs = require('fs');

module.exports = function buildApp() {
  childProcess.execSync('webpack --mode production');
  fs.copyFileSync('src/index.html', 'public/index.html');
};