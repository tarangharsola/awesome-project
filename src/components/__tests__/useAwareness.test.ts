import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useAwareness } from '../useAwareness';
import { WebSocketProvider } from '../WebSocket';

describe('useAwareness', () => {
  it('should return user presence', () => {
    const { getByText } = render(
      <WebSocketProvider>
        <useAwareness />
      </WebSocketProvider>
    );
    expect(getByText('User 1')).toBeInTheDocument();
  });
});
