{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import CursorTracker from './CursorTracker';

interface Props {
  language: string;
}

const Editor: React.FC<Props> = ({ language }) => {
  const [code, setCode] = useState('');
  const { send, receive } = useWebSocket();
  const { cursor, users } = useEditor(language);

  useEffect(() => {
    receive((data) => {
      setCode(data.code);
    });
  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    send({ type: 'code-change', code: newCode });
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      padding: 20,
    }}>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
      }}>
        <CursorTracker cursor={cursor} />
      </div>
      <div style={{
        position: 'absolute',
        top: 40,
        left: 10,
      }}>
        {users.map((user) => (
          <div key={user.id} style={{
            backgroundColor: user.color,
            padding: 5,
            borderRadius: 5,
          }}>{user.name}</div>
        ))}
      </div>
      <textarea style={{
        position: 'absolute',
        top: 100,
        left: 10,
        width: '100%',
        height: '100vh',
        padding: 20,
      }}
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
      />
    </div>
  );
}

export default Editor;