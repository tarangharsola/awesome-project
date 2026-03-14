{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const editor = useEditor();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    editor.on('user:join', handleUserJoin);
    editor.on('user:leave', handleUserLeave);

    return () => {
      editor.off('user:join', handleUserJoin);
      editor.off('user:leave', handleUserLeave);
    };
  }, []);

  return users;
};

export default useAwareness;