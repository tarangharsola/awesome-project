import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

describe('App smoke test', () => {
  test('renders language selector', () => {
    render(<App />);
    const selector = screen.getByLabelText(/language/i);
    expect(selector).toBeInTheDocument();
  });
});
