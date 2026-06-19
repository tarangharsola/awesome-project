// Import required modules
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// Define the test suite
describe('App', () => {
  it('should render the app', () => {
    // Render the app and assert it exists
    const app = render(<App />);
    expect(app).to.exist;
  });
});