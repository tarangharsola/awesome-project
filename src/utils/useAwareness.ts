{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const { users: currentUsers, cursorPositions: currentCursorPositions } = useUsers();
  const editor = useEditor();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
      setCursorPositions((prevCursorPositions) => {
        const newCursorPositions = { ...prevCursorPositions, [user.id]: editor.getCursorPosition() };
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
  }, [editor, currentUsers, currentCursorPositions]);

  return { users, cursorPositions };
};

export default useAwareness;