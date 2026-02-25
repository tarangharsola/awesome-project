// Import required modules
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useLanguage } from '../useLanguage';

// Mock WebSocket connection
const mockWebSocket = {
  send: jest.fn(),
  onmessage: jest.fn(),
};

// Test useLanguage hook
describe('useLanguage', () => {
  it('should return language state', () => {
    const language = useLanguage(mockWebSocket);
    expect(language).toBe(true);
  });
});