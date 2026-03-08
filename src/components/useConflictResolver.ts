{"import React from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const editor = useEditor();
  const { conflicts, resolveConflict } = editor;

  React.useEffect(() => {
    const handleConflict = (conflict) => {
      console.log('Conflict detected:', conflict);
      resolveConflict(conflict);
    };

    conflicts.subscribe(handleConflict);
    return () => {
      conflicts.unsubscribe(handleConflict);
    };
  }, [conflicts, resolveConflict]);

  return {
    conflicts,
    resolveConflict
  };
};

export default useConflictResolver;