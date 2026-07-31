{"import React, { useState } from 'react';
import { languages } from 'codemirror';

const LanguageSelector = ({ language, onChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    onChange(language);
  };

  return (
    <select value={selectedLanguage} onChange={(event) => handleLanguageChange(event.target.value)}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;