{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [cursors, setCursors] = useState([]);
  const editor = useEditor();
  const users = useUsers();

  useEffect(() => {
    const handleCursorUpdate = (cursor) => {
      setCursors((prevCursors) => [...prevCursors, cursor]);
    };

    editor.on('cursorUpdate', handleCursorUpdate);

    return () => editor.off('cursorUpdate', handleCursorUpdate);
  }, [editor]);

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setCursors((prevCursors) => prevCursors.filter((cursor) => cursor.userId !== user.id));
    };

    users.on('update', handleUserUpdate);

    return () => users.off('update', handleUserUpdate);
  }, [users]);

  return cursors;
};

export default useAwareness;