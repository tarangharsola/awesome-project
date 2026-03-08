{"import React from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const editor = useEditor();
  const { users, addUser, removeUser } = editor;

  React.useEffect(() => {
    const handleUserJoin = (user) => {
      console.log('User joined:', user);
      addUser(user);
    };

    const handleUserLeave = (user) => {
      console.log('User left:', user);
      removeUser(user);
    };

    users.subscribe(handleUserJoin);
    users.subscribe(handleUserLeave);
    return () => {
      users.unsubscribe(handleUserJoin);
      users.unsubscribe(handleUserLeave);
    };
  }, [users, addUser, removeUser]);

  return {
    users,
    addUser,
    removeUser
  };
};

export default useAwareness;