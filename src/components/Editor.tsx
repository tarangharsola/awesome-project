{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  documentId: string;
  language: string;
}

const Editor = ({ documentId, language }: EditorProps) => {
  const [code, setCode] = useState('');
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = useWebSocket(documentId);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'update') {
        setCode(data.code);
        setCursor(data.cursor);
      }
    };
    return () => ws.close();
  }, [documentId]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    useWebSocket(documentId).send({ type: 'update', code: newCode });
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        left: cursor.x,
        top: cursor.y,
        width: 2,
        height: 10,
        backgroundColor: 'red'
      }}>
        Cursor
      </div>
      <textarea value={code} onChange={(event) => handleCodeChange(event.target.value)} style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100vh',
        padding: 10,
        fontSize: 14,
        fontFamily: 'monospace'
      }}/>
      <div style={{
        position: 'absolute',
        left: 10,
        top: 10,
        backgroundColor: 'white',
        padding: 10,
        border: '1px solid black'
      }}>
        Users:
        {users.map((user, index) => (
          <div key={index} style={{
            backgroundColor: user.color,
            padding: 5,
            margin: 5,
            borderRadius: 5
          }}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Editor;