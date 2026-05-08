{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const [conflict, setConflict] = useState(false);
  const editor = useEditor();

  useEffect(() => {
    const handleConflict = () => {
      setConflict(true);
    };

    editor.on('conflict', handleConflict);

    return () => {
      editor.off('conflict', handleConflict);
    };
  }, [editor]);

  return conflict;
};

export default useConflictResolver;