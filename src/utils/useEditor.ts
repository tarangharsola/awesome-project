{"import { useState, useEffect } from 'react';
import { useWebSocket } from '../utils/useWebSocket';

const useEditor = () => {
  const [code, setCode] = useState('');
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive((message) => {
      setCode(message.code);
    });
  }, []);

  return { code, cursor: useCursor() };
};

export default useEditor;