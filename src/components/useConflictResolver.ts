{"import React from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const editor = useEditor();
  const conflicts = editor.getConflicts();

  React.useEffect(() => {
    if (conflicts.length > 0) {
      editor.resolveConflicts(conflicts);
    }
  }, [conflicts, editor]);

  return conflicts;
};

export default useConflictResolver;