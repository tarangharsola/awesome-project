{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const editor = useEditor();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    const handleCursorMove = (user, position) => {
      setCursorPositions((prevPositions) => ({ ...prevPositions, [user.id]: position }));
    };

    editor.on('userJoin', handleUserJoin);
    editor.on('userLeave', handleUserLeave);
    editor.on('cursorMove', handleCursorMove);

    return () => {
      editor.off('userJoin', handleUserJoin);
      editor.off('userLeave', handleUserLeave);
      editor.off('cursorMove', handleCursorMove);
    };
  }, [editor]);

  return {
    users,
    cursorPositions,
  };
};

export default useAwareness;