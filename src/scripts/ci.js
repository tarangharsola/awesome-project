// eslint-disable-next-line
import { execSync } from 'child_process';

export default function ci() {
  try {
    execSync('npm run test', { stdio: 'inherit' });
    console.log('Tests passed');
  } catch (error) {
    console.error('Tests failed:', error);
    process.exit(1);
  }
}