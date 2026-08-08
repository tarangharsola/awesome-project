// eslint-disable-next-line
import React from 'react';
import { render } from '@testing-library/react';

describe('App component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Collaborative Code Editor')).toBeInTheDocument();
  });
});