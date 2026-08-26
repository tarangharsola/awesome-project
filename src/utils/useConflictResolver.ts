import { DocumentChange } from '../../types/editor';
import { useCallback } from 'react';

export const useConflictResolver = () => {
  const resolve = useCallback((local: string, remoteChanges: DocumentChange[]): string => {
    // Simple last-write-wins strategy for demonstration purposes.
    let result = local;
    remoteChanges.forEach(change => {
      const { range, text } = change;
      const lines = result.split('\n');
      const startIdx = range.startLineNumber - 1;
      const endIdx = range.endLineNumber - 1;
      const before = lines.slice(0, startIdx);
      const after = lines.slice(endIdx + 1);
      result = [...before, text, ...after].join('\n');
    });
    return result;
  }, []);

  return { resolve };
};