{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const editor = useEditor();
  const usersList = useUsers();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    editor.on('userJoin', handleUserJoin);

    return () => editor.off('userJoin', handleUserJoin);
  }, []);

  useEffect(() => {
    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    editor.on('userLeave', handleUserLeave);

    return () => editor.off('userLeave', handleUserLeave);
  }, []);

  return users;
};

export default useAwareness;