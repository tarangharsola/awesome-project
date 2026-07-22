// eslint-disable-next-line
import { test } from 'tape';

const build = require('./build');

test('Build script runs without errors', (t) => {
  build();
  t.pass('Build script ran successfully.');
  t.end();
});

test('Test script runs without errors', (t) => {
  t.pass('Test script ran successfully.');
  t.end();
});