import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders app and language selector', () => {
  render(<App />);
  const selector = screen.getByLabelText(/language/i);
  expect(selector).toBeInTheDocument();
});
