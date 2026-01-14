{"import React from 'react';
import { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='html'>HTML</option>
      </select>
      <MonacoEditor
        language={language}
        value={code}
        theme={theme}
        onChange={handleCodeChange}
      />
      <select value={theme} onChange={handleThemeChange}>
        <option value='vs-dark'>Dark</option>
        <option value='vs-light'>Light</option>
      </select>
    </div>
  );
};

export default Editor;