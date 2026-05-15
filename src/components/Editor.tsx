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

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      theme: 'monokai',
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
      },
    });
    editor.on('change', (instance, change) => {
      onChange(instance.getValue());
    });
    editor.on('cursorActivity', () => {
      setCursorPosition(editor.getCursor());
    });
    return () => {
      editor.toTextArea();
    };
  }, [language, onChange]);

  return (
    <div>
      <textarea id='editor' value={value} onChange={(e) => onChange(e.target.value)} />
      <div>
        <span>Line {cursorPosition.line + 1}, Column {cursorPosition.ch + 1}</span>
      </div>
    </div>
  );
}

export default Editor;