{"import React from 'react';
import { useState } from 'react';
import { Languages } from 'prism-react-renderer';

const LanguageSelector = ({ language, onChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (language: string) => {
    onChange(language);
    setSelectedLanguage(language);
  };

  return (
    <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
      {Object.keys(Languages).map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;