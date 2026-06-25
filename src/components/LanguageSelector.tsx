{"import React, { useState } from 'react';
import { languages } from 'codemirror';

function LanguageSelector({ language, onChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    onChange(language);
  };

  return (
    <select value={selectedLanguage} onChange={(event) => handleLanguageChange(event.target.value)}>
      {languages.map((language, index) => (
        <option key={index} value={language}>{language}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;