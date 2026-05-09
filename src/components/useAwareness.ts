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

    return () => editor.off('cursorMove', handleCursorMove);
  }, [editor]);

  useEffect(() => {
    const handleUserJoin = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    users.on('join', handleUserJoin);

    return () => users.off('join', handleUserJoin);
  }, [users]);

  useEffect(() => {
    const handleUserLeave = (userId) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [userId]: null }));
    };

    users.on('leave', handleUserLeave);

    return () => users.off('leave', handleUserLeave);
  }, [users]);

  return awareness;
};

export default useAwareness;