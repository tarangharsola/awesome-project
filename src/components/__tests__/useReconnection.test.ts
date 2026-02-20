{"import { renderHook } from '@testing-library/react-hooks';
import { useReconnection } from './useReconnection';

describe('useReconnection', () => {
  it('should return the reconnection state', () => {
    const { result } = renderHook(() => useReconnection());
    expect(result.current).toEqual({ connected: false });
  });
});

export {};