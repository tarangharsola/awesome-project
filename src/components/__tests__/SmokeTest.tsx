import React from 'react';
import { render } from '@testing-library/react';
import Editor from '../Editor';

it('renders Editor component', () => {
  const { getByText } = render(<Editor />);
  expect(getByText('Editor')).toBeInTheDocument();
});