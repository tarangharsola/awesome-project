// Import required modules
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Collaborative Code Editor')).toBeInTheDocument();
  });
});