{"import React, { useState, useEffect } from 'react';
import { Editor as CodeMirror } from 'codemirror';
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

function Editor({ value, onChange, language }) {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [cursorColor, setCursorColor] = useState('#0000ff');

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      hint: true,
      extraKeys: {
        'Ctrl-Space': 'autocomplete'
      }
    });
    editor.on('change', (instance, change) => {
      onChange(instance.getValue());
    });
    editor.on('cursorActivity', (instance) => {
      setCursorPosition(instance.getCursor());
    });
    return () => editor.toTextArea();
  }, [language, onChange]);

  const handleCursorChange = (cursorPosition) => {
    setCursorPosition(cursorPosition);
  };

  return (
    <div>
      <textarea id='editor' value={value} onChange={(event) => onChange(event.target.value)} />
      <div style={{ position: 'absolute', top: cursorPosition.line * 20 + 10, left: cursorPosition.ch * 20 + 10, backgroundColor: cursorColor, width: 5, height: 5 }} />
    </div>
  );
}

export default Editor;