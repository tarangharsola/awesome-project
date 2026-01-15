// Jest test for Editor component
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Editor from '../Editor';

test('Editor renders correctly', () => {
  const { getByPlaceholderText } = render(<Editor />);
  expect(getByPlaceholderText('Code here...')).toBeInTheDocument();
});