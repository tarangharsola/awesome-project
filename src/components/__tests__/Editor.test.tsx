import React from 'react';
import Editor from '../Editor';
import { render } from '@testing-library/react';

it('renders Editor component', () => {
  const { getByText } = render(<Editor />);
  expect(getByText('Editor')).toBeInTheDocument();
});