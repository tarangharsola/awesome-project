import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

test('renders App component without crashing', () => {
  render(<App />);
  const appRoot = screen.getByTestId('app-root');
  expect(appRoot).toBeInTheDocument();
});
