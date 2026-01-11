{"import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ConflictResolver from './ConflictResolver';

describe('ConflictResolver', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ConflictResolver />);
    expect(getByText('Conflict Resolver')).toBeInTheDocument();
  });
});