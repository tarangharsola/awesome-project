const { spawnSync } = require('child_process');
const { resolve } = require('path');

const buildDir = resolve(__dirname, "build");
const buildCommand = "babel src --out-dir build";

spawnSync(buildCommand, { shell: true });