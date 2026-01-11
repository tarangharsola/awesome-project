{"import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Editor from './Editor';

describe('Editor', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Editor />);
    expect(getByText('Editor')).toBeInTheDocument();
  });
});