{"import React, { useState, useEffect } from 'react';
import { Editor as CodeMirror } from 'codemirror';
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
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';

function Editor({ code, language, onChange }) {
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      hint: true,
      searchcursor: true,
    });
    editor.on('change', (instance, change) => {
      onChange(instance.getValue());
    });
    return () => editor.toTextArea();
  }, [language, onChange]);

  const handleCursorPositionChange = (cursorPosition) => {
    setCursorPosition(cursorPosition);
    ws.send(JSON.stringify({ type: 'cursorPosition', cursorPosition }));
  };

  return (
    <div>
      <textarea id="editor" value={code} onChange={(event) => handleCursorPositionChange({ line: event.target.selectionStart, ch: event.target.selectionEnd })} />
      <CodeMirror value={code} onChange={handleCodeChange} />
    </div>
  );
}

export default Editor;