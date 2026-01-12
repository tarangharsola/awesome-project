{"import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Editor from './Editor';

describe('Editor', () => {
  it('renders language selector', () => {
    const { getByText } = render(<Editor />);
    expect(getByText('JavaScript')).toBeInTheDocument();
    expect(getByText('Python')).toBeInTheDocument();
    expect(getByText('HTML')).toBeInTheDocument();
  });

  it('renders Monaco editor', () => {
    const { getByRole } = render(<Editor />);
    expect(getByRole('textbox')).toBeInTheDocument();
  });

  it('formats code on button click', async () => {
    const { getByText } = render(<Editor />);
    const formatButton = getByText('Format');
    fireEvent.click(formatButton);
    await waitFor(() => {
      expect(getByRole('textbox')).toHaveValue('formatted code');
    });
  });
});
