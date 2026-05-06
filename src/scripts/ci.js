// CI script
const { execSync } = require('child_process');
const buildCommand = 'npm run build';
const testCommand = 'jest';
const ciScript = () => {
  execSync(buildCommand);
  execSync(testCommand);
};
module.exports = ciScript;