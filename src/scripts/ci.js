// This script runs tests and builds the application
const { execSync } = require('child_process');
execSync('jest');
execSync('npm run build');