{"import React from 'react';
import { useState } from 'react';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('javascript');

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='html'>HTML</option>
    </select>
  );
};

export default LanguageSelector;