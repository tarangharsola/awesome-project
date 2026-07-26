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

    return () => {
      editor.off('cursorUpdate', handleCursorUpdate);
    };
  }, []);

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    users.on('update', handleUserUpdate);

    return () => {
      users.off('update', handleUserUpdate);
    };
  }, []);

  return awareness;
};

export default useAwareness;