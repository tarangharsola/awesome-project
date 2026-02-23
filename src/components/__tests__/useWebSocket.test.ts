import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useWebSocket } from '../useWebSocket';
import { WebSocketProvider } from '../WebSocket';

describe('useWebSocket', () => {
  it('should establish WebSocket connection', () => {
    const { getByText } = render(
      <WebSocketProvider>
        <useWebSocket />
      </WebSocketProvider>
    );
    expect(getByText('Connected')).toBeInTheDocument();
  });
});
