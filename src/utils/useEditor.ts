{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
}

const useEditor = ({ language }: Props) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newCode = receive();
      setCode(newCode);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    send(newCode);
  }

  return { code, handleCodeChange };
}

export default useEditor;