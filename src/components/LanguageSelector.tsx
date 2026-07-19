{"import React from 'react';
import { useState } from 'react';
import { languages } from './languages';

function LanguageSelector({ language, onChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    onChange(language);
  };

  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;