import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Editor from '../Editor';

describe('Editor component', () => {
  it('renders editor with syntax highlighting', () => {
    const { getByPlaceholderText } = render(<Editor language='javascript' />);
    expect(getByPlaceholderText('Write code here...')).toBeInTheDocument();
  });
});