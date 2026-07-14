{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const editor = useEditor();
  const users = useUsers();

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };

    editor.on('conflict', handleConflict);
    return () => editor.off('conflict', handleConflict);
  }, [editor, users]);

  return conflicts;
};

export default useConflictResolver;