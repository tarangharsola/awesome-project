{"import React, { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';

function Editor({ code, language, onChange }) {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      hint: true,
      matchBrackets: true,
      closeBrackets: true,
    });
    editor.on('change', (instance, change) => {
      onChange(instance.getValue());
    });
    return () => editor.toTextArea();
  }, [language, onChange]);

  const handleCursorPositionChange = (newCursorPosition) => {
    setCursorPosition(newCursorPosition);
  };

  return (
    <div>
      <textarea id='editor' value={code} onChange={(e) => onChange(e.target.value)} />
      <div className='cursor-position'>{`Cursor position: ${cursorPosition.line},${cursorPosition.ch}`}</div>
    </div>
  );
}

export default Editor;