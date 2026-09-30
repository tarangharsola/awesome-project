import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

describe('Smoke Test', () => {
  test('renders the application without crashing', () => {
    render(<App />);
    const titleElement = screen.getByText(/collaborative code editor/i);
    expect(titleElement).toBeInTheDocument();
  });
});
