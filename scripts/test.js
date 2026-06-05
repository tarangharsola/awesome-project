const { test } = require('tap');
const { execSync } = require('child_process');
const { build } = require('./ci');

build(test);
