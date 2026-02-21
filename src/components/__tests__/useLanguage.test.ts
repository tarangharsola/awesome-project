// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useLanguage } from '../useLanguage';

test('useLanguage', () => {
  const { rerender } = render(<div>Test</div>);
  const language = useLanguage();
  expect(language).toBeDefined();
});