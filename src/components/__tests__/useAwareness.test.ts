import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useAwareness } from '../useAwareness';

it('should return user presence', () => {
  const { result } = render(<useAwareness />);
  expect(result.current.users).toEqual([]);
});

it('should update user presence', () => {
  const { result } = render(<useAwareness />);
  fireEvent.change(result.current.input, { target: { value: 'username' } });
  expect(result.current.users).toEqual(['username']);
});