{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useEditor = () => {
  const { send, receive } = useWebSocket();
  const [code, setCode] = useState('');

  useEffect(() => {
    const handleCodeUpdate = (event) => {
      setCode(event.code);
    };
    receive(handleCodeUpdate);
    return () => receive(null);
  }, []);

  const sendCode = (code) => send({ type: 'code', code });
  const receiveCode = () => code;

  return { sendCode, receiveCode };
};

export default useEditor;