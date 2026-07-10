{"import React from 'react';
import { useState } from 'react';
import { languages } from 'codemirror';

function LanguageSelector({ language, onChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;