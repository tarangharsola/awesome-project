// CI build script
const { execSync } = require('child_process');

execSync('jest', { stdio: 'inherit' });
execSync('tsc', { stdio: 'inherit' });