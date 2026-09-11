const { formatCode } = require('../src/utils/formatCode');
const assert = require('assert');

function runSmokeTest() {
  console.log('Running smoke test...');
  const input = 'const a = 1;';
  const result = formatCode(input, 'javascript');
  assert.strictEqual(typeof result, 'string');
  console.log('Smoke test passed');
}

try {
  runSmokeTest();
  process.exit(0);
} catch (e) {
  console.error('Smoke test failed:', e);
  process.exit(1);
}