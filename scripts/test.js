// eslint-disable-next-line
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { join } from 'path';
import { existsSync } from 'fs';
import { spawnSync } from 'child_process';

const testDir = join(__dirname, "test");
const testFile = join(testDir, "test.js");

describe('Tests', () => {
  it('should run tests', () => {
    const result = spawnSync('jest', [testFile], { stdio: 'inherit' });
    expect(result.status).to.equal(0);
  });
});