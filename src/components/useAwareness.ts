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

  return users;
};

export default useAwareness;