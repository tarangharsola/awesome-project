{"import React from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const editor = useEditor();
  const users = useUsers();

  React.useEffect(() => {
    const handleUserJoin = (user) => {
      editor.broadcastUserJoin(user);
    };
    const handleUserLeave = (user) => {
      editor.broadcastUserLeave(user);
    };
    users.on('join', handleUserJoin);
    users.on('leave', handleUserLeave);
    return () => {
      users.off('join', handleUserJoin);
      users.off('leave', handleUserLeave);
    };
  }, [editor, users]);

  return users;
};

export default useAwareness;