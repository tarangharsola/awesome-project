{"import React, { useState, useEffect } from 'react';
import { Editor } from 'react-simple-editor';
import { useLanguage } from './useLanguage';

function EditorComponent() {
  const language = useLanguage();
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');

  useEffect(() => {
    const codeMirror = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      theme: 'monokai'
    });

    codeMirror.on('change', () => {
      setCode(codeMirror.getValue());
      setFormattedCode(codeMirror.getValue());
    });
  }, [language]);

  return (
    <div>
      <Editor value={code} onChange={setCode} />
      <pre>{formattedCode}</pre>
    </div>
  );
}
export default EditorComponent;