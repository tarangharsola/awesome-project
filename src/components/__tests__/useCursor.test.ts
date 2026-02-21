// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useCursor } from '../useCursor';

test('useCursor', () => {
  const { rerender } = render(<div>Test</div>);
  const cursor = useCursor();
  expect(cursor).toBeDefined();
});