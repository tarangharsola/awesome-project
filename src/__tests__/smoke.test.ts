import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

test('renders App component without crashing', () => {
  render(<App />);
  const editorElement = screen.getByTestId('code-editor');
  expect(editorElement).toBeInTheDocument();
});
