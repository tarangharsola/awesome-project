{"import React, { useState } from 'react';
import { Language } from './types';

function LanguageSelector({ language, setLanguage }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setLanguage(event.target.value);
  };

  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='html'>HTML</option>
    </select>
  );
}

export default LanguageSelector;