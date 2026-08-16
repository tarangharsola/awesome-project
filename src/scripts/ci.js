const { execSync } = require('child_process');
const buildScript = 'npm run build';
const testScript = 'npm run test';

module.exports = {
  build: () => execSync(buildScript),
  test: () => execSync(testScript),
};