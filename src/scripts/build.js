// eslint-disable-next-line
import { spawnSync } from 'child_process';

export default function buildApp() {
  const buildResult = spawnSync('webpack', ['--mode', 'production', '--config', 'webpack.config.js']);
  if (buildResult.status !== 0) {
    console.error('Build failed with code', buildResult.status);
    process.exit(1);
  }
}