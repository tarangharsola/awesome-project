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

function Editor({ value, setValue, language }) {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });

  useEffect(() => {
    const cm = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      theme: 'monokai',
      extraKeys: {
        'Ctrl-Space': 'autocomplete'
      }
    });
    cm.on('cursorActivity', () => {
      setCursorPosition(cm.getCursor());
    });
    cm.on('change', () => {
      setValue(cm.getValue());
    });
    return () => {
      cm.toTextArea();
    };
  }, [language, setValue, value]);

  return (
    <div>
      <textarea id='editor' value={value} onChange={(e) => setValue(e.target.value)} />
      <div>
        <span>Cursor Position: {cursorPosition.line},{cursorPosition.ch}</span>
      </div>
    </div>
  );
}

export default Editor;