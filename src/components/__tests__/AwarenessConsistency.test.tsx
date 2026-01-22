// Import required modules
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AwarenessConsistency from './AwarenessConsistency';

// Test the component
describe('AwarenessConsistency', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AwarenessConsistency />);
    expect(getByText('Awareness Consistency')).toBeInTheDocument();
  });
});