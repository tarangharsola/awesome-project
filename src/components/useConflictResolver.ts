{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface ConflictResolverOptions {
  editor: useEditor;
  onConflict: (conflict: any) => void;
}

const useConflictResolver = ({ editor, onConflict }: ConflictResolverOptions) => {
  const [conflict, setConflict] = useState(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflict(conflict);
      onConflict(conflict);
    };

    editor.on('conflict', handleConflict);

    return () => {
      editor.off('conflict', handleConflict);
    };
  }, [editor, onConflict]);

  useEffect(() => {
    if (conflict && !resolved) {
      setResolved(true);
      editor.resolveConflict(conflict);
    }
  }, [conflict, editor, resolved]);

  return { conflict, resolved };
};

export default useConflictResolver;