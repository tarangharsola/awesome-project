{"import React from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const editor = useEditor();
  const users = editor.getUsers();

  React.useEffect(() => {
    editor.updateUsers(users);
  }, [users]);

  return users;
};

export default useAwareness;