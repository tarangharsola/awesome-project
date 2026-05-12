{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

interface AwarenessOptions {
  editor: useEditor;
  users: useUsers;
}

const useAwareness = ({ editor, users }: AwarenessOptions) => {
  const [awareness, setAwareness] = useState({});

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    users.on('update', handleUserUpdate);

    return () => {
      users.off('update', handleUserUpdate);
    };
  }, [users]);

  useEffect(() => {
    const handleCursorUpdate = (cursor) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [cursor.userId]: cursor }));
    };

    editor.on('cursorUpdate', handleCursorUpdate);

    return () => {
      editor.off('cursorUpdate', handleCursorUpdate);
    };
  }, [editor]);

  return awareness;
};

export default useAwareness;