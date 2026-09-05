import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';

describe('App Smoke Test', () => {
  test('renders without crashing and displays the editor', () => {
    render(<App />);
    // Assuming the editor component has a role of textbox or a placeholder text
    const editorElement = screen.getByRole('textbox');
    expect(editorElement).toBeInTheDocument();
  });
});
