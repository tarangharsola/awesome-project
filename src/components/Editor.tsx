{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';

const EditorComponent = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <Editor
        height="500"
        language={language}
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default EditorComponent;