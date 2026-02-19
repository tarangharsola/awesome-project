{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  language: string;
}

const useEditor = (language: string) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [users, setUsers] = useState([]);
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive((data) => {
      setCursor(data.cursor);
      setUsers(data.users);
    });
  }, []);

  return { cursor, users };
}

export default useEditor;