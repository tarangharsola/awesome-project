import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Editor from '../Editor';

describe('Editor', () => {
  it('renders editor component', () => {
    const { getByText } = render(<Editor />);
    expect(getByText('Editor')).toBeInTheDocument();
  });
});