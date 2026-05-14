// eslint-disable-next-line
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ci } from './ci';

describe('CI', () => {
  it('should build and test successfully', () => {
    const { build, test } = ci();
    expect(build).to.be.a('string');
    expect(test).to.be.a('string');
  });
});