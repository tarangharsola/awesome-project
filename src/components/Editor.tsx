{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  language: string;
  value: string;
}

const Editor = ({ language, value }: EditorProps) => {
  const [text, setText] = useState(value);
  const { send } = useWebSocket();
  const { cursor, users } = useEditor();

  useEffect(() => {
    send({ type: 'update', value: text });
  }, [text]);

  return (
    <div style={{
      padding: 10,
      border: '1px solid #ccc',
      borderRadius: 5,
      overflow: 'auto'
    }}>
      <pre style={{
        padding: 10,
        fontSize: 12,
        whiteSpace: 'pre-wrap'
      }}>{text}</pre>
      <div style={{
        position: 'absolute',
        left: cursor.x,
        top: cursor.y,
        width: 2,
        height: 20,
        backgroundColor: 'red',
        zIndex: 1
      }}>
        Cursor
      </div>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'lightgray',
        padding: 5,
        borderRadius: 5
      }}>
        Users: {users.map((user) => user.username).join(', ')}
      </div>
    </div>
  );
}

export default Editor;