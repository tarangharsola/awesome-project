import React from 'react';
import { render } from '@testing-library/react';
import Editor from '../Editor';

describe('Editor component', () => {
  it('renders editor', () => {
    const { getByText } = render(<Editor />);
    expect(getByText('Editor')).toBeInTheDocument();
  });
});