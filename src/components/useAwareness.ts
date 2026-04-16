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

    const handleCursorMove = (cursorPosition) => {
      setCursorPositions((prevCursorPositions) => {
        const updatedPositions = { ...prevCursorPositions, [cursorPosition.userId]: cursorPosition.position };
        return updatedPositions;
      });
    };

    webSocket.on('userJoin', handleUserJoin);
    webSocket.on('userLeave', handleUserLeave);
    webSocket.on('cursorMove', handleCursorMove);

    return () => {
      webSocket.off('userJoin', handleUserJoin);
      webSocket.off('userLeave', handleUserLeave);
      webSocket.off('cursorMove', handleCursorMove);
    };
  }, []);

  return { users, cursorPositions };
};

export default useAwareness;