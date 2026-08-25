import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  const rootElement = screen.getByTestId('app-root');
  expect(rootElement).toBeInTheDocument();
});
