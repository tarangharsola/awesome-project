{"import React, { useState, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import { useWebSocket } from '../utils/useWebSocket';
import { useUsers } from '../utils/useUsers';

interface Props {
  language: string;
  value: string;
}

const Editor: React.FC<Props> = ({ language, value }) => {
  const [text, setText] = useState(value);
  const { send } = useWebSocket();
  const { users } = useUsers();

  useEffect(() => {
    send({ type: 'update', value: text });
  }, [text]);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      padding: 10,
      backgroundColor: '#f0f0f0',
      fontFamily: 'monospace',
      fontSize: 12,
      overflow: 'auto',
    }}>
      <pre style={{
        padding: 10,
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: 5,
      }}>{text}</pre>
    </div>
  );
}

export default Editor;