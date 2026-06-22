{"import React, { useState, useEffect } from 'react';
import { Editor as CodeEditor } from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';

function Editor({ language, code, onChange }) {
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const editor = new CodeEditor(document.getElementById('editor'));
    editor.on('change', (code) => {
      onChange(code);
    });
    return () => {
      editor.destroy();
    };
  }, []);

  const handleCursorPositionChange = (position) => {
    setCursorPosition(position);
  };

  return (
    <div>
      <CodeEditor
        id='editor'
        value={code}
        onValueChange={onChange}
        highlight={languages[language]}
        padding={10}
        style={{
          fontSize: 12,
          fontFamily: 'Menlo, Monaco, monospace,
        }}
      />
      <div>
        <span>Cursor position: {cursorPosition}</span>
      </div>
    </div>
  );
}

export default Editor;