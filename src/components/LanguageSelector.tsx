{"import React from 'react';
import { useState } from 'react';

const LanguageSelector = () => {
  const [language, setLanguage] = useState('javascript');
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='html'>HTML</option>
    </select>
  );
};

export default LanguageSelector;