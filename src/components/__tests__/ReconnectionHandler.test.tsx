import React from 'react';
import ReconnectionHandler from '../ReconnectionHandler';
import { render } from '@testing-library/react';

it('renders ReconnectionHandler component', () => {
  const { getByText } = render(<ReconnectionHandler />);
  expect(getByText('Reconnection Handler')).toBeInTheDocument();
});