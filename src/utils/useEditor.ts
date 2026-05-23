{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  document: string;
}

const useEditor = (document: Props['document']) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive((message) => {
      setCursor(message.cursor);
    });
  }, []);

  return { cursor, send, receive };
};

export default useEditor;