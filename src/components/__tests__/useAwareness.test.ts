{"import { renderHook } from '@testing-library/react-hooks';
import { useAwareness } from './useAwareness';

describe('useAwareness', () => {
  it('should return the awareness state', () => {
    const { result } = renderHook(() => useAwareness());
    expect(result.current).toEqual({ users: [], cursorPositions: {} });
  });
});

export {};