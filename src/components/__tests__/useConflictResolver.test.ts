{"import { renderHook } from '@testing-library/react-hooks';
import { useConflictResolver } from '../useConflictResolver';

it('should resolve conflicts', () => {
  const { result } = renderHook(() => useConflictResolver());
  const conflict = { type: 'insert', position: 10, value: 'new text' };
  const resolved = result.current.resolveConflict(conflict);
  expect(resolved).toEqual({ type: 'insert', position: 10, value: 'new text' });
});

it('should handle concurrent edits', () => {
  const { result } = renderHook(() => useConflictResolver());
  const conflict1 = { type: 'insert', position: 10, value: 'new text' };
  const conflict2 = { type: 'insert', position: 15, value: 'more text' };
  const resolved1 = result.current.resolveConflict(conflict1);
  const resolved2 = result.current.resolveConflict(conflict2);
  expect(resolved1).toEqual({ type: 'insert', position: 10, value: 'new text' });
  expect(resolved2).toEqual({ type: 'insert', position: 15, value: 'more text' });
});
