{"import React, { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog-ext';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/anchor';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog-ext';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/anchor';
import 'codemirror/addon/display/placeholder';

const Editor = ({ language, code, onChange }) => {
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      theme: 'monokai',
      extraKeys: {
        'Ctrl-Space': 'autocomplete'
      }
    });
    editor.on('change', (instance, change) => {
      onChange(instance.getValue());
    });
    return () => {
      editor.toTextArea();
    };
  }, []);

  const handleCursorPositionChange = (position) => {
    setCursorPosition(position);
  };

  return (
    <div>
      <textarea id="editor" value={code} onChange={(event) => onChange(event.target.value)} />
      <div>
        <span>Cursor Position: {cursorPosition}</span>
      </div>
    </div>
  );
};

export default Editor;