import { test } from 'ava';
import { render } from '@testing-library/react';
import App from '../components/App';

test('renders app', async () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Collaborative Code Editor/i);
  expect(linkElement).toBeInTheDocument();
});