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

const Editor = ({ language, code, onChange }) => {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [cursorColor, setCursorColor] = useState('#000000');

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      theme: 'monokai',
      lineNumbers: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
      },
    });
    editor.on('change', (instance, change) => {
      onChange(instance.getValue());
    });
    return () => editor.toTextArea();
  }, [language, code, onChange]);

  const handleCursorPositionChange = (position) => {
    setCursorPosition(position);
  };

  const handleCursorColorChange = (color) => {
    setCursorColor(color);
  };

  return (
    <div>
      <textarea id='editor' value={code} onChange={(e) => onChange(e.target.value)} />
      <div>
        <span style={{ color: cursorColor }}>Cursor: {cursorPosition.line},{cursorPosition.ch}</span>
      </div>
    </div>
  );
};

export default Editor;