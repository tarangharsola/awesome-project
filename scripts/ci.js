import { execSync } from 'child_process';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const buildScript = resolve(__dirname, '../scripts/build.js');
const testScript = resolve(__dirname, '../src/components/__tests__/test.js');

execSync(`node ${buildScript} --test ${testScript}`);
