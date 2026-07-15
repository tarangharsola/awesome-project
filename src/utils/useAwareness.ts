{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const users = useUsers();
  const editor = useEditor();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    users.on('update', handleUserUpdate);

    return () => {
      users.off('update', handleUserUpdate);
    };
  }, []);

  useEffect(() => {
    const handleCursorUpdate = (cursor) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [cursor.userId]: cursor }));
    };

    editor.on('cursorUpdate', handleCursorUpdate);

    return () => {
      editor.off('cursorUpdate', handleCursorUpdate);
    };
  }, []);

  return awareness;
};

export default useAwareness;