import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useLanguage } from '../useLanguage';
import { WebSocketProvider } from '../WebSocket';

describe('useLanguage', () => {
  it('should return language', () => {
    const { getByText } = render(
      <WebSocketProvider>
        <useLanguage />
      </WebSocketProvider>
    );
    expect(getByText('Language')).toBeInTheDocument();
  });
});
