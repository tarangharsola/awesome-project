{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const editor = useEditor();
  const users = useUsers();

  useEffect(() => {
    const handleCursorMove = () => {
      const cursor = editor.getCursor();
      const user = users.getCurrentUser();

      if (user) {
        setAwareness((prevAwareness) => ({
          ...prevAwareness,
          [user.id]: cursor,
        }));
      }
    };

    editor.on('cursorMove', handleCursorMove);

    return () => {
      editor.off('cursorMove', handleCursorMove);
    };
  }, [editor, users]);

  return awareness;
};

export default useAwareness;