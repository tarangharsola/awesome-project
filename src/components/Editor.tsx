{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';
import { useConflictResolver } from './useConflictResolver';

interface Props {
  language: string;
  value: string;
}

const Editor = ({ language, value }) => {
  const [text, setText] = useState(value);
  const { sendText } = useWebSocket();
  const { users } = useUsers();
  const { resolveConflict } = useConflictResolver();

  useEffect(() => {
    sendText(text);
  }, [text]);

  const handleTextChange = (newText) => {
    setText(newText);
    resolveConflict(newText);
  };

  return (
    <div style={{
      padding: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    }}>
      <textarea
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        style={{
          width: '100%',
          height: 200,
          padding: 10,
          fontSize: 14,
          fontFamily: 'monospace',
        }}
      />
    </div>
  );
}

export default Editor;