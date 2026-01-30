{"import React from 'react';
import { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      theme: 'monokai'
    });

    editor.on('change', () => {
      setCode(editor.getValue());
      setFormattedCode(beautifyCode(code));
    });

    return () => {
      editor.toTextArea();
    };
  }, [language, code]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const beautifyCode = (code) => {
    // Implement code formatting logic here
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='html'>HTML</option>
      </select>
      <textarea id='editor' value={code} onChange={handleCodeChange} />
      <pre>{formattedCode}</pre>
    </div>
  );
};

export default Editor;