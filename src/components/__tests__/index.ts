import { describe, it, expect } from 'jest';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Editor from '../Editor';

describe('Editor component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Editor />);
    expect(getByText('Code Editor')).toBeInTheDocument();
  });
});