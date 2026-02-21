// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useConflictResolver } from '../useConflictResolver';

test('useConflictResolver', () => {
  const { rerender } = render(<div>Test</div>);
  const conflictResolver = useConflictResolver();
  expect(conflictResolver).toBeDefined();
});