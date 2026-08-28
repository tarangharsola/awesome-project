import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders app without crashing', () => {
  render(<App />);
  const titleElement = screen.getByText(/collaborative code editor/i);
  expect(titleElement).toBeInTheDocument();
});
