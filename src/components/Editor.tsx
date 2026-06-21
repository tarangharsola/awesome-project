{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  documentId: string;
  language: string;
}

const Editor = ({ documentId, language }) => {
  const [code, setCode] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const { send } = useWebSocket();
  const { updateCode } = useEditor();

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
    updateCode(documentId, language, newCode);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      overflow: 'auto'
    }}>
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        style={{
          width: '100%',
          height: '100%',
          padding: 10,
          fontSize: 12,
          fontFamily: 'monospace'
        }}
      />
      <CursorTracker cursor={cursor} user={{ name: 'John Doe', color: '#ff0000' }} />
    </div>
  );
}

export default Editor;