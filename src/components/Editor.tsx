{"import React, { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';

function Editor({ value, language }) {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
    });
    editor.on('cursorActivity', (instance, cursor) => {
      setCursorPosition(cursor);
    });
    return () => {
      editor.toTextArea();
    };
  }, []);

  return (
    <div>
      <textarea id="editor" value={editorValue} onChange={(e) => setEditorValue(e.target.value)} />
      <div>Cursor position: {cursorPosition.line}, {cursorPosition.ch}</div>
    </div>
  );
}

export default Editor;