import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

test('App renders without crashing', () => {
  render(<App />);
});
