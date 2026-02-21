{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const editor = useEditor();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
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