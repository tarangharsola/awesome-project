// eslint-disable-next-line
import { execSync } from 'child_process';

const runTests = () => {
  console.log('Running tests...');
  const result = execSync('jest', { stdio: 'inherit' });
  console.log(result);
};

module.exports = runTests;