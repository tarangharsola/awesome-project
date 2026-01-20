import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Editor from '../Editor';

test('renders editor component', () => {
  const { getByText } = render(<Editor />);
  expect(getByText('Code Editor')).toBeInTheDocument();
});
