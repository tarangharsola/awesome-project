{"import React from 'react';
import { useState } from 'react';
import { languages } from './languages';

function LanguageSelector({ language, onChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
    onChange(newLanguage);
  };

  return (
    <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;