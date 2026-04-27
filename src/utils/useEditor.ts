{"import { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';

function useEditor() {
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'javascript',
      lineNumbers: true,
    });
    editor.on('cursorActivity', (instance, cursor) => {
      setCursorPosition(cursor.position);
    });
    return () => {
      editor.toTextArea();
    };
  }, []);

  return { code, cursorPosition };
}

export default useEditor;