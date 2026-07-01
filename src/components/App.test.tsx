// This is a basic test file for the App component
import React from 'react';
import { render } from '@testing-library/react';

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Hello World')).toBeInTheDocument();
  });
});