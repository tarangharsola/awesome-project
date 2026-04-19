{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useReconnection } from './useReconnection';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const editor = useEditor();
  const { reconnecting, lastKnownState } = useReconnection();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    const handleCursorMove = (cursorPosition) => {
      setCursorPositions((prevCursorPositions) => {
        const newCursorPositions = { ...prevCursorPositions, [cursorPosition.userId]: cursorPosition.position };
        return newCursorPositions;
      });
    };

    editor.on('userJoin', handleUserJoin);
    editor.on('userLeave', handleUserLeave);
    editor.on('cursorMove', handleCursorMove);

    return () => {
      editor.off('userJoin', handleUserJoin);
      editor.off('userLeave', handleUserLeave);
      editor.off('cursorMove', handleCursorMove);
    };
  }, [editor, reconnecting, lastKnownState]);

  useEffect(() => {
    if (reconnecting) {
      setUsers(lastKnownState.users);
      setCursorPositions(lastKnownState.cursorPositions);
    }
  }, [reconnecting, lastKnownState]);

  return { users, cursorPositions };
};

export default useAwareness;