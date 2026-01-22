// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import CursorTracker from '../CursorTracker';

describe('CursorTracker', () => {
  it('tracks cursors correctly', () => {
    const tracker = new CursorTracker();
    expect(tracker.track()).toBe(true);
  });
});