// Jest test for Editor component
import React from 'react';
import { render } from '@testing-library/react';
import Editor from '../Editor';

test('renders editor', () => {
  const { getByText } = render(<Editor />);
  expect(getByText('Editor')).toBeInTheDocument();
});