{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from 'react-simple-code-editor';
import { Highlight, Languages } from 'prism-react-renderer';

const EditorComponent = () => {
  const [language, setLanguage] = useState(Languages.JS);
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
    setFormattedCode(prism.highlight(code, Languages[language], true));
  };

  return (
    <div>
      <LanguageSelector language={language} onChange={handleLanguageChange} />
      <Editor
        value={code}
        onChange={handleCodeChange}
        highlight={formattedCode}
        language={language}
        padding={10}
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
        }}
      />
    </div>
  );
};

export default EditorComponent;