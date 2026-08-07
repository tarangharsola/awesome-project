{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';
import { useWebSocket } from './useWebSocket';

interface Awareness {
  users: any[];
  cursorPositions: any[];
}

const useAwareness = () => {
  const { users } = useUsers();
  const { webSocket } = useWebSocket();
  const [awareness, setAwareness] = useState<Awareness>({ users: [], cursorPositions: [] });

  useEffect(() => {
    const handleUserUpdate = (user: any) => {
      setAwareness((prevAwareness) => ({
        users: [...prevAwareness.users, user],
        cursorPositions: [...prevAwareness.cursorPositions, user.cursorPosition],
      }));
    };

    const handleCursorUpdate = (cursorPosition: any) => {
      setAwareness((prevAwareness) => ({
        users: [...prevAwareness.users],
        cursorPositions: [...prevAwareness.cursorPositions, cursorPosition],
      }));
    };

    webSocket.onmessage = (event) => {
      if (event.data.type === 'userUpdate') {
        handleUserUpdate(event.data.user);
      } else if (event.data.type === 'cursorUpdate') {
        handleCursorUpdate(event.data.cursorPosition);
      }
    };
  }, [webSocket]);

  return awareness;
};

export default useAwareness;