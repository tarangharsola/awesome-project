import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

test('renders App without crashing and shows language selector', () => {
  render(<App />);
  const selector = screen.getByLabelText(/language/i);
  expect(selector).toBeInTheDocument();
});
