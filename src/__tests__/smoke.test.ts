import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders the collaborative editor without crashing', () => {
  render(<App />);
  // The editor component should have a textbox role for the code area
  const editor = screen.getByRole('textbox');
  expect(editor).toBeInTheDocument();
});
