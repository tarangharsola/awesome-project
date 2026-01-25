// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ReconnectionHandler from '../ReconnectionHandler';

describe('ReconnectionHandler', () => {
  it('should reconnect correctly', () => {
    const handler = new ReconnectionHandler();
    const connection = handler.reconnect();
    expect(connection).toBeNull();
  });
});