{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const editor = useEditor();
  const [conflicts, setConflicts] = useState([]);

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