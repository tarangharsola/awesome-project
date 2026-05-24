{"import { describe, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Collaborative Code Editor')).toBeInTheDocument();
  });
});"