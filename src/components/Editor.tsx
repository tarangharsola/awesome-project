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
    <div>
      <textarea value={code} onChange={(e) => handleCodeChange(e.target.value)} />
      {users.map((user) => (
        <CursorTracker key={user.username} cursor={user.cursor} username={user.username} color={user.color} />
      ))}
    </div>
  );
}

export default Editor;