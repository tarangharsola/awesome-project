// eslint-disable-next-line
import { spawnSync } from 'child_process';
import { resolve } from 'path';
import { existsSync } from 'fs';

const buildScript = async () => {
  const buildCommand = 'npm run build';
  const buildProcess = spawnSync(buildCommand, { shell: true });
  if (buildProcess.status !== 0) {
    throw new Error(`Build failed with code ${buildProcess.status}`);
  }
};

export default buildScript;