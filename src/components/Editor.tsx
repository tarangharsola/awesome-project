{"import React from 'react';
import { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });

  useEffect(() => {
    const cm = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      theme: 'monokai'
    });

    cm.on('cursorActivity', (instance, cursor) => {
      setCursorPosition(cursor);
    });

    return () => {
      cm.toTextArea();
    };
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='html'>HTML</option>
      </select>
      <textarea id='editor' value={code} onChange={handleCodeChange} />
      <div>Cursor Position: {cursorPosition.line},{cursorPosition.ch}</div>
    </div>
  );
};

export default Editor;