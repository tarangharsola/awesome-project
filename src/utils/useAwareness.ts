{"import { useState, useEffect } from 'react';
import { useEditor, useUsers } from './useEditor';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const editor = useEditor();
  const users = useUsers();
  const { send } = useWebSocket();

  useEffect(() => {
    const handleCursorMove = (cursor) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [cursor.userId]: cursor }));
    };

    editor.on('cursorMove', handleCursorMove);

    return () => {
      editor.off('cursorMove', handleCursorMove);
    };
  }, [editor]);

  useEffect(() => {
    const handleUserJoin = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    users.on('join', handleUserJoin);

    return () => {
      users.off('join', handleUserJoin);
    };
  }, [users]);

  useEffect(() => {
    const handleUserLeave = (userId) => {
      setAwareness((prevAwareness) => {
        const awareness = { ...prevAwareness };
        delete awareness[userId];
        return awareness;
      });
    };

    users.on('leave', handleUserLeave);

    return () => {
      users.off('leave', handleUserLeave);
    };
  }, [users]);

  useEffect(() => {
    const handleSend = () => {
      send('awareness', awareness);
    };

    send('awareness', awareness);

    return () => {
      send.cancel(handleSend);
    };
  }, [send, awareness]);

  return awareness;
};

export default useAwareness;