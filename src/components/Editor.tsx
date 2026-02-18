{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-code-editor';
import { Highlight, Languages } from 'prismjs';

const EditorComponent = () => {
  const [language, setLanguage] = useState(Languages.javascript);
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        setCode(code + '  ');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLanguageChange = (language) => {
    setLanguage(language);
    Highlight.init(language);
  };

  const handleCodeChange = (code) => {
    setCode(code);
    setFormattedCode(prism.highlight(code, Highlight.getLanguage(language), 'x'));
  };

  return (
    <div>
      <select value={language} onChange={(event) => handleLanguageChange(event.target.value)}>
        <option value={Languages.javascript}>JavaScript</option>
        <option value={Languages.python}>Python</option>
        <option value={Languages.html}>HTML</option>
      </select>
      <Editor
        value={code}
        onValueChange={handleCodeChange}
        highlight={formattedCode}
        padding={10}
        style={{ fontFamily: 'monospace', fontSize: 12 }}
      />
    </div>
  );
};

export default EditorComponent;