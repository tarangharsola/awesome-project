{"import React from 'react';
import { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('javascript');

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  return (
    <div>
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
    </div>
  );
};

export default LanguageSelector;