import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

test('renders App component without crashing', () => {
  render(<App />);
  const titleElement = screen.getByText(/collaborative code editor/i);
  expect(titleElement).toBeInTheDocument();
});
