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
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/searchcursor';

const Editor = () => {
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });

  useEffect(() => {
    const cm = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      foldGutter: true,
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
      },
    });
    cm.on('change', (instance, change) => {
      setCode(instance.getValue());
      setCursorPosition(change.from);
    });
    return () => cm.toTextArea();
  }, []);

  return (
    <div>
      <textarea id="editor" />
      <div>
        <span>Line {cursorPosition.line + 1}, Column {cursorPosition.ch + 1}</span>
      </div>
    </div>
  );
};

export default Editor;