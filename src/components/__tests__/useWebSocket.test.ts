// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useWebSocket } from '../useWebSocket';

test('useWebSocket', () => {
  const { rerender } = render(<div>Test</div>);
  const webSocket = useWebSocket();
  expect(webSocket).toBeDefined();
});