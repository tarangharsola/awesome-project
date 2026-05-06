{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const editor = useEditor();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    editor.on('userJoin', handleUserJoin);

    return () => editor.off('userJoin', handleUserJoin);
  }, [editor]);

  return users;
};

export default useAwareness;