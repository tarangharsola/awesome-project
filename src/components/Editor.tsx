{"import React from 'react';
import { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [formatting, setFormatting] = useState('');

  useEffect(() => {
    const cm = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      lineNumbers: true,
      theme: 'monokai'
    });

    cm.on('change', () => {
      setCode(cm.getValue());
    });

    return () => {
      cm.toTextArea();
    };
  }, [language]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleFormat = () => {
    setFormatting('json');
  };

  const handleKeydown = (e) => {
    if (e.key === 'Ctrl+S') {
      console.log('Saved!');
    }
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <button onClick={handleFormat}>Format</button>
      <textarea id="editor" onkeydown={handleKeydown} />
    </div>
  );
};

export default Editor;