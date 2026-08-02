{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  language: string;
  value: string;
}

const useEditor = ({ language, value }) => {
  const [text, setText] = useState(value);
  const { send } = useWebSocket();

  useEffect(() => {
    send({ type: 'update', value: text });
  }, [text]);

  return { text, setText };
}

export default useEditor;