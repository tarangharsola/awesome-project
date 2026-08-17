// This script will run tests and build the application
const { execSync } = require('child_process');
execSync('jest', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });