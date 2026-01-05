import React from 'react';
import CursorTracker from '../CursorTracker';
import { render } from '@testing-library/react';

it('renders CursorTracker component', () => {
  const { getByText } = render(<CursorTracker />);
  expect(getByText('Cursor Tracker')).toBeInTheDocument();
});