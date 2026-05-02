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

const Editor = ({ value, language }) => {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [editorValue, setEditorValue] = useState(value);

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
      const cursorPosition = cm.getCursor();
      setCursorPosition(cursorPosition);
    });
    return () => {
      cm.toTextArea();
    };
  }, []);

  const handleEditorChange = (editorValue) => {
    setEditorValue(editorValue);
  };

  return (
    <div>
      <textarea id='editor' value={editorValue} onChange={(e) => handleEditorChange(e.target.value)} />
      <div>Cursor position: {cursorPosition.line},{cursorPosition.ch}</div>
    </div>
  );
};

export default Editor;