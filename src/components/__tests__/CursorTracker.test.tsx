// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import CursorTracker from '../CursorTracker';

describe('CursorTracker', () => {
  it('tracks cursors correctly', () => {
    const cursors = [
      // add cursor data here
    ];
    const tracked = CursorTracker.track(cursors);
    expect(tracked).toMatchSnapshot();
  });
});