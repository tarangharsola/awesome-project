{"import React from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const editor = useEditor();
  const conflicts = editor.getConflicts();
  const resolved = editor.resolveConflicts(conflicts);
  return resolved;
};

export default useConflictResolver;