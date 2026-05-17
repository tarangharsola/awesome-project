{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onChange }) => {
  const [language, setLanguage] = useState(selectedLanguage);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;