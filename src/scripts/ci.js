// eslint-disable-next-line
import { execSync } from 'child_process';

export default function ci() {
  console.log('Running tests...');
  const testResults = execSync('jest', { stdio: 'inherit' });
  console.log('Tests completed.');
  process.exit(testResults.status);
}