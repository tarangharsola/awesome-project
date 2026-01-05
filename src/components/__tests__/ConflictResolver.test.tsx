// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ConflictResolver from '../ConflictResolver';

describe('ConflictResolver', () => {
  it('resolves conflicts correctly', () => {
    const conflict = {
      // add conflict data here
    };
    const resolved = ConflictResolver.resolve(conflict);
    expect(resolved).toMatchSnapshot();
  });
});