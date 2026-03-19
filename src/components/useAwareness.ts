{"import React from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const editor = useEditor();
  const users = useUsers();

  React.useEffect(() => {
    editor.updateAwareness(users);
  }, [users]);

  return users;
};

export default useAwareness;