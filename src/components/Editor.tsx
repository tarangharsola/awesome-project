{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-code-editor';
import { Highlight, Languages } from 'prismjs';

const EditorComponent = () => {
  const [language, setLanguage] = useState(Languages.javascript);
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleCodeChange = (code: string) => {
    setCode(code);
    setFormattedCode(prism.highlight(code, Highlight.javascript, Languages.javascript));
  };

  return (
    <div>
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
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