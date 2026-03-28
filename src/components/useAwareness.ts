{"import React from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const editor = useEditor();
  const users = useUsers();

  const handleUserJoin = (user) => {
    editor.addUser(user);
  };

  const handleUserLeave = (user) => {
    editor.removeUser(user);
  };

  React.useEffect(() => {
    users.forEach((user) => handleUserJoin(user));

    return () => {
      users.forEach((user) => handleUserLeave(user));
    };
  }, [users]);

  return users;
};

export default useAwareness;