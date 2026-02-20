{"import { renderHook } from '@testing-library/react-hooks';
import { useConflictResolver } from './useConflictResolver';

describe('useConflictResolver', () => {
  it('should return the conflict resolver state', () => {
    const { result } = renderHook(() => useConflictResolver());
    expect(result.current).toEqual({ document: '', conflicts: {} });
  });
});

export {};