// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useReconnection } from '../useReconnection';

test('useReconnection', () => {
  const { rerender } = render(<div>Test</div>);
  const reconnection = useReconnection();
  expect(reconnection).toBeDefined();
});