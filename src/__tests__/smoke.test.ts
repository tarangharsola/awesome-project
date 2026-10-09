import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('App renders without crashing and displays language selector', () => {
  render(<App />);
  // Assuming the LanguageSelector component renders a label or placeholder containing the word "Language"
  const languageLabel = screen.getByText(/Language/i);
  expect(languageLabel).toBeInTheDocument();
});
