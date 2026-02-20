{"import { renderHook } from '@testing-library/react-hooks';
import { useEditor } from './useEditor';

describe('useEditor', () => {
  it('should return the editor state', () => {
    const { result } = renderHook(() => useEditor());
    expect(result.current).toEqual({ document: '', cursorPositions: {}, conflicts: {} });
  });
});

export {};