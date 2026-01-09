{"import React from 'react';
import { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [theme, setTheme] = useState('vs-dark');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <select value={theme} onChange={handleThemeChange}>
        <option value="vs-dark">Dark</option>
        <option value="vs-light">Light</option>
      </select>
      <MonacoEditor
        language={language}
        theme={theme}
        value={value}
        onChange={(e) => setValue(e)}
      />
    </div>
  );
};

export default Editor;