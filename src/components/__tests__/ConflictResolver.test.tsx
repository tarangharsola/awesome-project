import React from 'react';
import ConflictResolver from '../ConflictResolver';
import { render } from '@testing-library/react';

it('renders ConflictResolver component', () => {
  const { getByText } = render(<ConflictResolver />);
  expect(getByText('Conflict Resolver')).toBeInTheDocument();
});