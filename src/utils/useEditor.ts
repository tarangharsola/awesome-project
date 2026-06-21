{"import { useState, useEffect } from 'react';

interface EditorProps {
  documentId: string;
  language: string;
}

const useEditor = (props: EditorProps) => {
  const [code, setCode] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 } as { x: number; y: number; });
  const { send } = useWebSocket();

  useEffect(() => {
    const handleUpdate = (data) => {
      setCode(data.code);
      setCursor(data.cursor);
    };
    send({ type: 'UPDATE', data: { code, cursor } });
    return () => {
      send({ type: 'DISCONNECT' });
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    // Update code in storage
  };

  return { code, cursor, handleCodeChange };
};

export default useEditor;