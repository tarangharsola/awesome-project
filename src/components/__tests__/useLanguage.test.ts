{"import { renderHook } from '@testing-library/react-hooks';
import { useLanguage } from './useLanguage';

describe('useLanguage', () => {
  it('should return the language state', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current).toEqual({ language: '' });
  });
});

export {};