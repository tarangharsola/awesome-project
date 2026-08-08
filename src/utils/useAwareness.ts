{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const editor = useEditor();
  const users = useUsers();

  useEffect(() => {
    const handleCursorUpdate = (cursor) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [cursor.userId]: cursor }));
    };

    editor.on('cursorUpdate', handleCursorUpdate);

    return () => editor.off('cursorUpdate', handleCursorUpdate);
  }, [editor]);

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    users.on('userUpdate', handleUserUpdate);

    return () => users.off('userUpdate', handleUserUpdate);
  }, [users]);

  return awareness;
};

export default useAwareness;