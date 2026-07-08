// Import required modules
import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

// Test App component
it('renders App component', () => {
  const { getByText } = render(<App />);
  expect(getByText('Collaborative Code Editor')).toBeInTheDocument();
});