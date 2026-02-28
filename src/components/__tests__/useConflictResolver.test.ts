import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useConflictResolver } from '../useConflictResolver';

it('should resolve conflicts', () => {
  const { result } = render(<useConflictResolver />);
  expect(result.current.conflicts).toEqual([]);
});

it('should handle concurrent edits', () => {
  const { result } = render(<useConflictResolver />);
  fireEvent.change(result.current.input, { target: { value: 'edit 1' } });
  fireEvent.change(result.current.input, { target: { value: 'edit 2' } });
  expect(result.current.conflicts).toEqual(['edit 1', 'edit 2']);
});