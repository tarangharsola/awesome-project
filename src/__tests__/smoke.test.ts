import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

test('renders the collaborative editor without crashing', () => {
  render(<App />);
  // The editor is typically rendered as a textarea or contenteditable element.
  // Using role="textbox" works for both cases.
  const editor = screen.getByRole('textbox');
  expect(editor).toBeInTheDocument();
});
