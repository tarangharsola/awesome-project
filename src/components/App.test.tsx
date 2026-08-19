import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders the code editor', () => {
  render(<App />);
  // Assuming the editor component has a role of textbox or an aria-label
  const editor = screen.getByRole('textbox');
  expect(editor).toBeInTheDocument();
});
