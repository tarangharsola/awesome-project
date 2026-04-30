{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const editor = useEditor();
  const usersList = useUsers();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    editor.on('userUpdate', handleUserUpdate);

    return () => {
      editor.off('userUpdate', handleUserUpdate);
    };
  }, [editor]);

  useEffect(() => {
    const handleUserLeave = (userId) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

    usersList.on('userLeave', handleUserLeave);

    return () => {
      usersList.off('userLeave', handleUserLeave);
    };
  }, [usersList]);

  return users;
};

export default useAwareness;