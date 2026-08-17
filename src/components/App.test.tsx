// This test file will contain unit tests for the App component
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders correctly', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});