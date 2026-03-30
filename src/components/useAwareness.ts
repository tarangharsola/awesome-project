{"import React from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const editor = useEditor();
  const users = editor.getUsers();
  const userPresence = editor.getUserPresence();
  return { users, userPresence };
};

export default useAwareness;