{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';

interface Props {
  language: string;
}

const Editor: React.FC<Props> = ({ language }) => {
  const [code, setCode] = useState('');
  const { send, receive } = useWebSocket();
  const { users } = useUsers();
  const { cursor, updateCursor } = useEditor(language);

  useEffect(() => {
    const handleCodeChange = (newCode: string) => {
      setCode(newCode);
      send({ type: 'code', code: newCode });
    };
    return handleCodeChange;
  }, []);

  useEffect(() => {
    const handleCursorUpdate = (newCursor: { x: number; y: number }) => {
      updateCursor(newCursor);
    };
    return handleCursorUpdate;
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'auto',
    }}>
      <pre style={{
        padding: 10,
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
      }}>{code}</pre>
      <CursorTracker cursor={cursor} />
      <UserList users={users} />
    </div>
  );
}

export default Editor;