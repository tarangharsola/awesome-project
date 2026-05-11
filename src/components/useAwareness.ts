{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const editor = useEditor();
  const { users: connectedUsers } = useUsers();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    editor.on('userJoin', handleUserJoin);
    editor.on('userLeave', handleUserLeave);

    return () => {
      editor.off('userJoin', handleUserJoin);
      editor.off('userLeave', handleUserLeave);
    };
  }, [editor]);

  return users;
};

export default useAwareness;