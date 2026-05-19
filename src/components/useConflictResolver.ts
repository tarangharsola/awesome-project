{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useConflictResolver = () => {
  const [conflicts, setConflicts] = useState([]);
  const { editorState, dispatch } = useEditor();

  useEffect(() => {
    const handleConflict = (conflict) => {
      setConflicts((prevConflicts) => [...prevConflicts, conflict]);
    };

    editorState.on('conflict', handleConflict);

    return () => {
      editorState.off('conflict', handleConflict);
    };
  }, [editorState]);

  return conflicts;
};

export default useConflictResolver;