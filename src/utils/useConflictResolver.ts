{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const editor = useEditor();

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };

    editor.on('conflict', handleConflict);
    return () => editor.off('conflict', handleConflict);
  }, [editor]);

  return conflicts;
};

export default useConflictResolver;