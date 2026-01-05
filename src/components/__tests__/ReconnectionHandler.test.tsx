// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ReconnectionHandler from '../ReconnectionHandler';

describe('ReconnectionHandler', () => {
  it('reconnects correctly', () => {
    const handler = new ReconnectionHandler();
    handler.reconnect();
    expect(handler.isConnected()).toBe(true);
  });
});