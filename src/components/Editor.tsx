{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }) => {
  const [text, setText] = useState(value);
  const { send } = useWebSocket();
  const { cursor } = useEditor();

  useEffect(() => {
    send({ type: 'update', value: text });
  }, [text]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onChange(text);
    }
  };

  return (
    <div style={{
      padding: 10,
      border: '1px solid #ccc',
      borderRadius: 5,
    }}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          height: 200,
          padding: 10,
          fontSize: 14,
        }}
      />
    </div>
  );
}

export default Editor;