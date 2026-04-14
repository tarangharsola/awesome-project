{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface ConflictResolver {
  resolveConflict: (conflict: any) => any;
}

const useConflictResolver = (): ConflictResolver => {
  const [conflict, setConflict] = useState(null);
  const editor = useEditor();

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflict(conflict);
      editor.resolveConflict(conflict);
    };

    editor.on('conflict', handleConflict);

    return () => editor.off('conflict', handleConflict);
  }, [editor]);

  return { resolveConflict: (conflict) => setConflict(conflict) };
};

export default useConflictResolver;