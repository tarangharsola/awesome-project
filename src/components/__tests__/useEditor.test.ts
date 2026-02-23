import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useEditor } from '../useEditor';
import { WebSocketProvider } from '../WebSocket';

describe('useEditor', () => {
  it('should render editor', () => {
    const { getByText } = render(
      <WebSocketProvider>
        <useEditor />
      </WebSocketProvider>
    );
    expect(getByText('Editor')).toBeInTheDocument();
  });
});
