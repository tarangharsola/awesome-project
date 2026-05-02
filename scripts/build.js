const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const buildDir = 'build';
const srcDir = 'src';

fs.mkdirSync(buildDir);

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.ts') || file.endsWith('.tsx')) {
    const filePath = path.join(srcDir, file);
    const buildPath = path.join(buildDir, file.replace('.ts', '.js').replace('.tsx', '.jsx'));
    childProcess.execSync(`tsc ${filePath} --outFile ${buildPath}`);
  }
});