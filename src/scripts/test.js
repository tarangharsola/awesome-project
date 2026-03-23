// eslint-disable-next-line
import { describe, it, expect } from 'expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../components/App';

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Collaborative Code Editor')).toBeInTheDocument();
  });
});