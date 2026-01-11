{"import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AwarenessConsistency from './AwarenessConsistency';

describe('AwarenessConsistency', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AwarenessConsistency />);
    expect(getByText('Awareness Consistency')).toBeInTheDocument();
  });
});