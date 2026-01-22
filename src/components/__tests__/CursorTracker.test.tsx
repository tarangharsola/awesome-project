// Import required modules
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CursorTracker from './CursorTracker';

// Test the component
describe('CursorTracker', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CursorTracker />);
    expect(getByText('Cursor Tracker')).toBeInTheDocument();
  });
});