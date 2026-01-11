{"import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CursorTracker from './CursorTracker';

describe('CursorTracker', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CursorTracker />);
    expect(getByText('Cursor Tracker')).toBeInTheDocument();
  });
});