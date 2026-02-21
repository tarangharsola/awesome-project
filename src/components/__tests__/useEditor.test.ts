// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useEditor } from '../useEditor';

test('useEditor', () => {
  const { rerender } = render(<div>Test</div>);
  const editor = useEditor();
  expect(editor).toBeDefined();
});