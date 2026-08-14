{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  language: string;
  code: string;
}

const useEditor = ({ language, code }: EditorProps) => {
  const { send, receive } = useWebSocket();
  const [codeState, setCodeState] = useState(code);

  useEffect(() => {
    send({ type: 'update', code: codeState });
  }, [codeState]);

  useEffect(() => {
    const updatedCode = receive({ type: 'update' });
    setCodeState(updatedCode);
  }, []);

  return { syntaxHighlighting: () => codeState }; // placeholder for syntax highlighting
}

export default useEditor;