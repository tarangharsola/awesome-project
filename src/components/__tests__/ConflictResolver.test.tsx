// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ConflictResolver from '../ConflictResolver';

describe('ConflictResolver', () => {
  it('resolves conflicts correctly', () => {
    const resolver = new ConflictResolver();
    expect(resolver.resolve()).toBe(true);
  });
});