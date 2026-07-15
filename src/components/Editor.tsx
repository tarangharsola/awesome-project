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

const Editor = () => {
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      foldGutter: true,
      indentUnit: 2,
      indentWithTabs: false,
    });
    editor.on('change', (instance, change) => {
      setCode(instance.getValue());
      setCursorPosition({ line: change.from.line, ch: change.from.ch });
    });
    return () => {
      editor.toTextArea();
    };
  }, []);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleCursorPositionChange = (newCursorPosition) => {
    setCursorPosition(newCursorPosition);
  };

  return (
    <div>
      <textarea id='editor' value={code} onChange={(e) => handleCodeChange(e.target.value)} />
      <div>
        <span>Line: {cursorPosition.line + 1}</span>
        <span>Column: {cursorPosition.ch + 1}</span>
      </div>
    </div>
  );
};

export default Editor;