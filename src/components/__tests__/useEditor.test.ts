import React from 'react';
import { render } from '@testing-library/react';
import { Editor } from '../Editor';

describe('Editor', () => {
  it('renders editor', () => {
    const { getByRole } = render(<Editor />);
    const editor = getByRole('textbox');
    assert.ok(editor);
  });
});