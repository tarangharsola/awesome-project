{"import React from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const editor = useEditor();
  const users = editor.getUsers();
  const cursors = editor.getCursors();
  return {
    users,
    cursors
  };
};

export default useAwareness;