{"import React from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const editor = useEditor();
  const conflicts = editor.getConflicts();

  React.useEffect(() => {
    editor.resolveConflicts(conflicts);
  }, [conflicts]);

  return conflicts;
};

export default useConflictResolver;