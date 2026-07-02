{"import { useState, useEffect } from 'react';
import { useWebSocket } from '../utils/useWebSocket';

interface Props {
  language: string;
}

const useEditor = ({ language }) => {
  const [code, setCode] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [users, setUsers] = useState([]);
  const { send, receive } = useWebSocket();

  useEffect(() => {
    const handleReceive = (data) => {
      if (data.type === 'code') {
        setCode(data.code);
      } else if (data.type === 'cursor') {
        setCursor(data.cursor);
      } else if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    receive(handleReceive);
    return () => {
      receive(null);
    };
  }, []);

  return { cursor, users, send, receive };
};

export default useEditor;