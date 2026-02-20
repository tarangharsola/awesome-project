{"import { renderHook } from '@testing-library/react-hooks';
import { useWebSocket } from './useWebSocket';

describe('useWebSocket', () => {
  it('should return the web socket state', () => {
    const { result } = renderHook(() => useWebSocket());
    expect(result.current).toEqual({ connected: false });
  });
});

export {};