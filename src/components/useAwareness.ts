{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const editor = useEditor();
  const { users: currentUsers } = useUsers();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    editor.on('userJoin', handleUserJoin);

    return () => editor.off('userJoin', handleUserJoin);
  }, [editor]);

  useEffect(() => {
    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    currentUsers.forEach((user) => editor.on('userLeave', handleUserLeave, user.id));

    return () => currentUsers.forEach((user) => editor.off('userLeave', handleUserLeave, user.id));
  }, [editor, currentUsers]);

  return users;
};

export default useAwareness;