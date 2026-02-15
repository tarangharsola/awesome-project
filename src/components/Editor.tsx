{"import React from 'react';
import { useState } from 'react';
import CodeMirror from 'codemirror';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <CodeMirror value={code} onChange={handleCodeChange} language={language} />
    </div>
  );
};

export default Editor;