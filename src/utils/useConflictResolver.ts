{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const { editorState, dispatch } = useEditor();

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };

    dispatch({ type: 'RESOLVE_CONFLICT', handler: handleConflict });
  }, [dispatch]);

  return conflicts;
};

export default useConflictResolver;