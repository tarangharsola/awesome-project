{"import { renderHook } from '@testing-library/react-hooks';
import { useCursor } from './useCursor';

describe('useCursor', () => {
  it('should return the cursor state', () => {
    const { result } = renderHook(() => useCursor());
    expect(result.current).toEqual({ id: '', x: 0, y: 0 });
  });
});

export {};