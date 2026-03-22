{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import CursorTracker from './CursorTracker';

interface Props {
  roomId: string
}

const Editor: React.FC<Props> = ({ roomId }) => {
  const [code, setCode] = useState('');
  const { send, receive } = useWebSocket(roomId);
  const { cursor, users } = useEditor(code, send);

  useEffect(() => {
    const interval = setInterval(() => {
      receive();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'auto'
    }}>
      <pre style={{
        padding: 10,
        fontSize: 12,
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc'
      }}>{code}</pre>
      <CursorTracker cursor={cursor} userId={users.currentUserId} />
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 5,
        border: '1px solid #ccc'
      }}>{users.users.map((user) => (
        <span key={user.id} style={{
          color: user.color,
          marginRight: 5
        }}>{user.name}</span>
      ))}</div>
    </div>
  );
}

export default Editor;