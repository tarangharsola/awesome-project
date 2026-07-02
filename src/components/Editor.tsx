{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';

interface Props {
  language: string;
}

const Editor = ({ language }) => {
  const [code, setCode] = useState('');
  const { send, receive } = useWebSocket();
  const { cursor, users } = useEditor();

  useEffect(() => {
    const handleReceive = (data) => {
      setCode(data.code);
    };
    receive(handleReceive);
    return () => {
      receive(null);
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    send({ type: 'code', code: newCode });
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'auto',
    }}>
      <pre style={{
        padding: 10,
        fontSize: 12,
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
      }}>{code}</pre>
      <CursorTracker cursor={cursor} />
      <UserList users={users} />
    </div>
  );
};

export default Editor;