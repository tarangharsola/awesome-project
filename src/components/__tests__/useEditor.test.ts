// Import required modules
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useEditor } from '../useEditor';

// Mock WebSocket connection
const mockWebSocket = {
  send: jest.fn(),
  onmessage: jest.fn(),
};

// Test useEditor hook
describe('useEditor', () => {
  it('should return editor state', () => {
    const editor = useEditor(mockWebSocket);
    expect(editor).toBe(true);
  });
});