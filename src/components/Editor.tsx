{"import React, { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';

function Editor({ language, document }) {
  const [code, setCode] = useState(document);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
    });
    editor.on('cursorActivity', (instance, cursor) => {
      setCursorPosition(cursor.position);
    });
    return () => {
      editor.toTextArea();
    };
  }, []);

  return (
    <div>
      <textarea id='editor' value={code} onChange={(event) => setCode(event.target.value)} />
      <div>Cursor position: {cursorPosition}</div>
    </div>
  );
}

export default Editor;