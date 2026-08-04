{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useCursor = () => {
  const { receive } = useWebSocket();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleCursorUpdate = (event) => {
      setCursor(event.cursor);
    };
    const handleUserUpdate = (event) => {
      setUsers(event.users);
    };
    receive(handleCursorUpdate, handleUserUpdate);
    return () => receive(null, null);
  }, []);

  return { cursor, users };
};

export default useCursor;