{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  language: string;
}

const useEditor = ({ language }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCode('');
    }, 1000);
    return () => clearInterval(intervalId);
  }, [language]);

  return code;
}

export default useEditor;