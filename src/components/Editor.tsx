{"import React from 'react';
import { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');

  useEffect(() => {
    const cm = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      theme: 'monokai'
    });

    cm.on('change', () => {
      setCode(cm.getValue());
      setFormattedCode(cm.getValue());
    });

    return () => {
      cm.toTextArea();
    };
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleFormat = () => {
    const formattedCode = beautify(code);
    setFormattedCode(formattedCode);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='html'>HTML</option>
      </select>
      <button onClick={handleFormat}>Format</button>
      <textarea id='editor' value={formattedCode} readOnly></textarea>
    </div>
  );
};

export default Editor;