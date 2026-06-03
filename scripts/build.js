const { execSync } = require('child_process');
const { resolve } = require('path');
const rootDir = resolve(__dirname, '..');
const buildDir = join(rootDir, 'build');

execSync('webpack --mode production --output-path ' + buildDir);
