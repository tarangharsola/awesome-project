{"import React from 'react';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';

const Editor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <LanguageSelector value={language} onChange={handleLanguageChange} />
      <textarea value={code} onChange={handleCodeChange} />
    </div>
  );
};

export default Editor;