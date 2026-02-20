// Import required modules
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useAwareness } from '../useAwareness';

// Mock WebSocket connection
const mockWebSocket = {
  send: jest.fn(),
  onmessage: jest.fn(),
  close: jest.fn()
};

// Test useAwareness hook
describe('useAwareness', () => {
  it('should return awareness state', () => {
    const awareness = useAwareness(mockWebSocket);
    expect(awareness).toBe(true);
  });
});