// eslint-disable-next-line
import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

test('renders App component', () => {
  const { getByText } = render(<App />);
  expect(getByText('Collaborative Code Editor')).toBeInTheDocument();
});