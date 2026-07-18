{"import React from 'react';
import { useState } from 'react';
import { languages } from './languages';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('javascript');

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  return (
    <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;