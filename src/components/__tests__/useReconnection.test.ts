import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useReconnection } from '../useReconnection';
import { WebSocketProvider } from '../WebSocket';

describe('useReconnection', () => {
  it('should reconnect on failure', () => {
    const { getByText } = render(
      <WebSocketProvider>
        <useReconnection />
      </WebSocketProvider>
    );
    expect(getByText('Reconnected')).toBeInTheDocument();
  });
});
