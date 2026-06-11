{"import { describe, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders title', () => {
    const { getByText } = render(<App />);
    expect(getByText('Collaborative Code Editor')).toBeInTheDocument();
  });
});"