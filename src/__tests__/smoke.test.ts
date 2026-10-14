import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from '../components/App';

describe('Smoke Test', () => {
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    }
  });

  it('renders App component without crashing', () => {
    render(<App />, container!);
    // Basic assertion: the container should have child nodes after render
    expect(container!.childElementCount).toBeGreaterThan(0);
  });
});