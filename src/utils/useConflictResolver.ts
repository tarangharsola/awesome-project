{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const { editorState, dispatch } = useEditor();
  const { users } = useUsers();

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };

    editorState.on('conflict', handleConflict);

    return () => {
      editorState.off('conflict', handleConflict);
    };
  }, [editorState, dispatch, users]);

  return conflicts;
};

export default useConflictResolver;