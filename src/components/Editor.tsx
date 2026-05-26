{"import React, { useState, useEffect } from 'react';
import { Editor as CodeEditor } from 'react-simple-code-editor';
import { Highlight, Languages } from 'prismjs';

function Editor({ content, language }) {
  const [code, setCode] = useState(content);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    Highlight.init(Languages[language]);
  }, [language]);

  const handleCodeChange = (code) => {
    setCode(code);
  };

  const handleCursorPositionChange = (position) => {
    setCursorPosition(position);
  };

  return (
    <CodeEditor
      value={code}
      onValueChange={handleCodeChange}
      highlight={Highlight}
      language={language}
      padding={10}
      style={{
        fontSize: 12,
        fontFamily: 'monospace',
        backgroundColor: '#f0f0f0',
        padding: 10,
      }}
    />
  );
}

export default Editor;