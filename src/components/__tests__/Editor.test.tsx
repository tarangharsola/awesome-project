// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Editor from '../Editor';

describe('Editor', () => {
  it('renders editor', () => {
    const { getByPlaceholderText } = render(<Editor />);
    expect(getByPlaceholderText('Write code here...')).toBeInTheDocument();
  });
});