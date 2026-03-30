{"import React from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const editor = useEditor();
  const conflicts = editor.getConflicts();
  const resolveConflict = (conflict) => {
    editor.resolveConflict(conflict);
  };
  return { conflicts, resolveConflict };
};

export default useConflictResolver;