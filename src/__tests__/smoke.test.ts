import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

test('App renders without crashing', () => {
  const { getByTestId } = render(<App />);
  // Assuming the main editor container has a test id "editor-container"
  const editor = getByTestId('editor-container');
  expect(editor).toBeInTheDocument();
});
