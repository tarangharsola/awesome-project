const { execSync } = require('child_process');
const buildCommand = 'webpack --mode production';
execSync(buildCommand, { stdio: 'inherit' });