{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    const handleCursorUpdate = (cursorPosition) => {
      setCursorPositions((prevCursorPositions) => {
        const updatedCursorPositions = { ...prevCursorPositions, [cursorPosition.userId]: cursorPosition.position };
        return updatedCursorPositions;
      });
    };

    webSocket.on('userJoin', handleUserJoin);
    webSocket.on('userLeave', handleUserLeave);
    webSocket.on('cursorUpdate', handleCursorUpdate);

    return () => {
      webSocket.off('userJoin', handleUserJoin);
      webSocket.off('userLeave', handleUserLeave);
      webSocket.off('cursorUpdate', handleCursorUpdate);
    };
  }, []);

  return { users, cursorPositions };
};

export default useAwareness;