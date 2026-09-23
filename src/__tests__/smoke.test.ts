import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

test('App component renders without crashing', () => {
  expect(() => render(<App />)).not.toThrow();
});
