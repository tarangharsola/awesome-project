{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface EditorProps {
  language: string;
  code: string;
}

const Editor: React.FC<EditorProps> = ({ language, code }) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [codeState, setCodeState] = useState(code);
  const { send } = useWebSocket();
  const { cursorPosition } = useEditor();

  useEffect(() => {
    setCodeState(code);
  }, [code]);

  const handleCursorChange = (newCursor: { x: number; y: number }) => {
    setCursor(newCursor);
    send({ type: 'cursor', data: newCursor });
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'auto'
    }}>
      <div style={{
        position: 'absolute',
        left: cursor.x,
        top: cursor.y,
        width: 2,
        height: 10,
        backgroundColor: 'red'
      }}>
        Cursor
      </div>
      <pre style={{
        padding: 10,
        fontSize: 12
      }}>{codeState}</pre>
    </div>
  );
}

export default Editor;