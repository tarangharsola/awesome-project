// Import required modules
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Editor from './Editor';

// Test the component
describe('Editor', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Editor />);
    expect(getByText('Editor')).toBeInTheDocument();
  });
});