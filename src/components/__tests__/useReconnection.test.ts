// Import required modules
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useReconnection } from '../useReconnection';

// Mock WebSocket connection
const mockWebSocket = {
  send: jest.fn(),
  onmessage: jest.fn(),
};

// Test useReconnection hook
describe('useReconnection', () => {
  it('should return reconnection state', () => {
    const reconnection = useReconnection(mockWebSocket);
    expect(reconnection).toBe(true);
  });
});