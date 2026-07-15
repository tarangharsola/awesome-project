// This file contains tests for the App component
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders correctly', () => {
  const { getByText } = render(<App />);
  expect(getByText('Hello World')).toBeInTheDocument();
});