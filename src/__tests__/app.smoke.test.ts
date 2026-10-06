import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

describe('App Smoke Test', () => {
  test('renders the app without crashing', () => {
    render(<App />);
    const titleElement = screen.getByText(/collaborative code editor/i);
    expect(titleElement).toBeInTheDocument();
  });
});
