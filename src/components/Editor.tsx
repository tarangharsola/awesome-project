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

function Editor({ content, language }) {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [editorContent, setEditorContent] = useState(content);

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
    editor.on('cursorActivity', () => {
      setCursorPosition(editor.getCursor());
    });
    return () => {
      editor.toTextArea();
    };
  }, []);

  const handleEditorChange = (editor) => {
    setEditorContent(editor.getValue());
  };

  return (
    <div>
      <textarea id='editor' value={editorContent} onChange={handleEditorChange} />
      <div>
        <span>Line {cursorPosition.line + 1}, Column {cursorPosition.ch + 1}</span>
      </div>
    </div>
  );
}

export default Editor;