{"import React from 'react';
import { useState } from 'react';
import { languages } from 'codemirror';

function LanguageSelector({ language, onChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    onChange(language);
  };

  return (
    <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;