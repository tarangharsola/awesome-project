{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const editor = useEditor();
  const usersList = useUsers();

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setUsers((prevUsers) => {
        const index = prevUsers.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          return [...prevUsers.slice(0, index), user, ...prevUsers.slice(index + 1)];
        }
        return [...prevUsers, user];
      });
    };

    usersList.on('update', handleUserUpdate);

    return () => {
      usersList.off('update', handleUserUpdate);
    };
  }, [usersList]);

  useEffect(() => {
    const handleCursorUpdate = (cursor) => {
      const user = users.find((u) => u.id === cursor.userId);
      if (user) {
        user.cursor = cursor;
        setUsers(users);
      }
    };

    editor.on('cursorUpdate', handleCursorUpdate);

    return () => {
      editor.off('cursorUpdate', handleCursorUpdate);
    };
  }, [editor, users]);

  return users;
};

export default useAwareness;