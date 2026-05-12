// eslint-disable-next-line
import { execSync } from 'child_process';

export default function runTests() {
  try {
    execSync('jest', { stdio: 'inherit' });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}