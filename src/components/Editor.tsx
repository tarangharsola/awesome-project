{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';

interface EditorProps {
  language: string;
  code: string;
}

const Editor = ({ language, code }: EditorProps) => {
  const [codeState, setCodeState] = useState(code);
  const { send, receive } = useWebSocket();
  const { syntaxHighlighting } = useEditor(language);

  useEffect(() => {
    send({ type: 'update', code: codeState });
  }, [codeState]);

  useEffect(() => {
    const updatedCode = receive({ type: 'update' });
    setCodeState(updatedCode);
  }, []);

  return (
    <div style={{
      padding: 10,
      backgroundColor: '#f0f0f0',
    }}>
      <pre style={{
        padding: 10,
        backgroundColor: '#fff',
        border: '1px solid #ddd',
      }}>
        {syntaxHighlighting(codeState)}
      </pre>
    </div>
  );
}

export default Editor;