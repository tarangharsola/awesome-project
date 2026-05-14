// eslint-disable-next-line
import { execSync } from 'child_process';

export default function ci() {
  const build = execSync('npm run build', { stdio: 'inherit' });
  const test = execSync('npm run test', { stdio: 'inherit' });
  return { build, test };
}