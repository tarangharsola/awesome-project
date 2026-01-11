{"import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReconnectionHandler from './ReconnectionHandler';

describe('ReconnectionHandler', () => {
  it('renders correctly', () => {
    const { getByText } = render(<ReconnectionHandler />);
    expect(getByText('Reconnection Handler')).toBeInTheDocument();
  });
});