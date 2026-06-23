{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';
import { useCursor } from './useCursor';
import CursorTracker from './CursorTracker';

interface Props {
  roomId: string;
  initialCode: string;
}

const Editor = ({ roomId, initialCode }: Props) => {
  const [code, setCode] = useState(initialCode);
  const { sendOperation } = useWebSocket(roomId);
  const { users } = useUsers(roomId);
  const { cursorPosition, cursorColor } = useCursor(roomId);

  useEffect(() => {
    const handleCodeChange = (newCode: string) => {
      setCode(newCode);
    };
    sendOperation({ type: 'UPDATE_CODE', code: newCode });
  }, [code, sendOperation]);

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: '#f0f0f0',
        fontSize: 14,
        fontFamily: 'monospace',
        overflow: 'auto',
      }}>
        <pre style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}>{code}</pre>
      </div>
      {users.map((user, index) => (
        <CursorTracker key={index} userId={user.id} cursorPosition={user.cursorPosition} />
      ))}
    </div>
  );
}

export default Editor;