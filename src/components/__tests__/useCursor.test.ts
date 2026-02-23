import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useCursor } from '../useCursor';
import { WebSocketProvider } from '../WebSocket';

describe('useCursor', () => {
  it('should return cursor position', () => {
    const { getByText } = render(
      <WebSocketProvider>
        <useCursor />
      </WebSocketProvider>
    );
    expect(getByText('Cursor position')).toBeInTheDocument();
  });
});
