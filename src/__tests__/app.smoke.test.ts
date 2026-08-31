import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

describe('App Smoke Test', () => {
  test('renders without crashing and shows language selector', () => {
    render(<App />);
    const selector = screen.getByLabelText(/language/i);
    expect(selector).toBeInTheDocument();
  });
});
