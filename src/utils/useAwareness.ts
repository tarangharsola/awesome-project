{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const editor = useEditor();
  const users = useUsers();

  useEffect(() => {
    const handleCursorUpdate = (cursor) => {
      editor.updateCursor(cursor);
    };
    users.forEach((user) => editor.updateCursor(user.cursor));
    return () => editor.off('cursorUpdate', handleCursorUpdate);
  }, [editor, users]);

  return { users, updateCursor: editor.updateCursor };
};

export default useAwareness;