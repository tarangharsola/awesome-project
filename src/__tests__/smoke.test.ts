import { formatCode } from '../utils/formatCode';
import assert from 'assert';

describe('Smoke test for formatCode utility', () => {
  it('should return a string for JavaScript input', () => {
    const input = 'const x = 42;';
    const output = formatCode(input, 'javascript');
    assert.strictEqual(typeof output, 'string');
  });
});