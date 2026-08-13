// eslint-disable-next-line
import { execSync } from 'child_process';

export default function build() {
  execSync('npm run build', { stdio: 'inherit' });
}