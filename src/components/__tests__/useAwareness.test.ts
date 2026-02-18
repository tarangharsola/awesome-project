{"import { renderHook } from '@testing-library/react-hooks';
import { useAwareness } from '../useAwareness';

it('should return user presence', () => {
  const { result } = renderHook(() => useAwareness());
  expect(result.current.userPresence).toBe(false);
});

it('should update user presence', () => {
  const { result } = renderHook(() => useAwareness());
  result.current.handleUserJoin('user1');
  expect(result.current.userPresence).toBe(true);
});

it('should handle user leave', () => {
  const { result } = renderHook(() => useAwareness());
  result.current.handleUserLeave('user1');
  expect(result.current.userPresence).toBe(false);
});
