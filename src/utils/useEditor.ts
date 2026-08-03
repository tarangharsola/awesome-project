{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  code: string;
  language: string;
}

const useEditor = ({ code, language }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive((message) => {
      if (message.type === 'update') {
        setCursor(message.cursor);
      }
    });
  }, []);

  return {
    cursor,
    users: [],
  };
}

export default useEditor;