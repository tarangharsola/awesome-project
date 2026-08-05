{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const editor = useEditor();
  const users = useUsers();

  useEffect(() => {
    const handleCursorMove = (cursor) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [cursor.userId]: cursor }));
    };

    editor.on('cursorMove', handleCursorMove);

    return () => {
      editor.off('cursorMove', handleCursorMove);
    };
  }, []);

  return awareness;
};

export default useAwareness;