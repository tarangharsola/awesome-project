import React from 'react';
import { render } from '@testing-library/react';

describe('Smoke Test', () => {
  it('renders without crashing', () => {
    render(<div>Hello World!</div>);
  });
});