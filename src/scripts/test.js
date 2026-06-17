const { execSync } = require('child_process');
const testScript = 'jest';
execSync(testScript, { stdio: 'inherit' });
