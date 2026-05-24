import { execSync } from 'child_process';

execSync('npm run build');
execSync('npm run test');