// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useAwareness } from '../useAwareness';

test('useAwareness', () => {
  const { rerender } = render(<div>Test</div>);
  const awareness = useAwareness();
  expect(awareness).toBeDefined();
});