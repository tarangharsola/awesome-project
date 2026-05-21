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

function Editor({ editorState, setEditorState }) {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [editorValue, setEditorValue] = useState(editorState.value);

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'javascript',
      lineNumbers: true,
      indentUnit: 2,
      indentWithTabs: false,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      hint: true,
      showHint: true,
      closeBrackets: true,
      matchBrackets: true,
    });
    editor.on('cursorActivity', () => {
      setCursorPosition(editor.getCursor());
    });
    editor.on('change', () => {
      setEditorValue(editor.getValue());
      setEditorState({ value: editor.getValue(), cursorPosition: editor.getCursor() });
    });
    return () => {
      editor.toTextArea();
    };
  }, []);

  return (
    <div>
      <textarea id='editor' value={editorValue} onChange={(e) => setEditorValue(e.target.value)} />
      <div>
        <span>Cursor position: {cursorPosition.line},{cursorPosition.ch}</span>
      </div>
    </div>
  );
}

export default Editor;