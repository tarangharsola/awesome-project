import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useConflictResolver } from '../useConflictResolver';
import { WebSocketProvider } from '../WebSocket';

describe('useConflictResolver', () => {
  it('should resolve conflicts', () => {
    const { getByText } = render(
      <WebSocketProvider>
        <useConflictResolver />
      </WebSocketProvider>
    );
    expect(getByText('Conflict resolved')).toBeInTheDocument();
  });
});
