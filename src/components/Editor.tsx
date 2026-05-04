{"import React, { useState, useEffect } from 'react';
import { Editor as CodeEditor } from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';

const Editor = ({ cursorPositions }) => {
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const handleCursorMovement = (cursorPosition) => {
      setCursorPosition(cursorPosition);
    };

    WebSocket.on('cursorMovement', handleCursorMovement);
    return () => WebSocket.off('cursorMovement', handleCursorMovement);
  }, []);

  return (
    <CodeEditor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={highlight}
      language={languages.js}
      cursorPosition={cursorPosition}
    />
  );
};

export default Editor;