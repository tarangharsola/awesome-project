const { execSync } = require('child_process');

execSync('npm run build');
execSync('jest');