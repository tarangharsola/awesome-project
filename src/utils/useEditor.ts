{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  onCodeChange: (code: string) => void;
}

const useEditor = ({ onCodeChange }: Props) => {
  const { sendCode } = useWebSocket();
  const [code, setCode] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      sendCode(code);
    }, 100);
    return () => clearInterval(interval);
  }, [code]);

  return { code, setCode, sendCode };
};

export default useEditor;