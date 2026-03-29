{"import React from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const editor = useEditor();
  const { conflicts, resolveConflict } = editor;

  React.useEffect(() => {
    const handleConflict = (conflict) => {
      resolveConflict(conflict);
    };
    editor.on('conflict', handleConflict);
    return () => editor.off('conflict', handleConflict);
  }, [editor]);

  return conflicts;
};

export default useConflictResolver;