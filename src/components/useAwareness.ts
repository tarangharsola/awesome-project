{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const editor = useEditor();
  const usersList = useUsers();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
      setCursorPositions((prevCursorPositions) => {
        const newCursorPositions = { ...prevCursorPositions, [user.id]: user.cursorPosition };
        return newCursorPositions;
      });
    };

    const handleUserLeave = (userId) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setCursorPositions((prevCursorPositions) => {
        const newCursorPositions = { ...prevCursorPositions };
        delete newCursorPositions[userId];
        return newCursorPositions;
      });
    };

    editor.on('userJoin', handleUserJoin);
    editor.on('userLeave', handleUserLeave);

    return () => {
      editor.off('userJoin', handleUserJoin);
      editor.off('userLeave', handleUserLeave);
    };
  }, [editor, usersList]);

  return { users, cursorPositions };
};

export default useAwareness;