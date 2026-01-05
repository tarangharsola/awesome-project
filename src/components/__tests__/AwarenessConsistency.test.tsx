import React from 'react';
import AwarenessConsistency from '../AwarenessConsistency';
import { render } from '@testing-library/react';

it('renders AwarenessConsistency component', () => {
  const { getByText } = render(<AwarenessConsistency />);
  expect(getByText('Awareness Consistency')).toBeInTheDocument();
});