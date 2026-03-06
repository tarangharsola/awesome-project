{"import React, { useState, useEffect } from 'react';
import { Editor as CodeMirror } from 'react-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

const Editor = ({ document, setDocument, cursorPositions }) => {
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
    });

    editor.on('change', (instance, changes) => {
      setDocument(instance.getValue());
      WebSocket.send({ type: 'document', document: instance.getValue() });
    });

    return () => {
      editor.toTextArea();
    };
  }, [document, setDocument, language, cursorPositions]);

  return (
    <div>
      <textarea id="editor" />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="htmlmixed">HTML</option>
      </select>
    </div>
  );
};

export default Editor;