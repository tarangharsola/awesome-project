{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const { editorState, dispatch } = useEditor();
  const { users } = useUsers();

  useEffect(() => {
    const handleCursorMove = (cursor) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [cursor.userId]: cursor }));
    };

    editorState.on('cursor-move', handleCursorMove);

    return () => {
      editorState.off('cursor-move', handleCursorMove);
    };
  }, [editorState]);

  return awareness;
};

export default useAwareness;