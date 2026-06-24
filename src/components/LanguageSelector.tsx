{"import React from 'react';
import { useState } from 'react';

interface Language {
  name: string;
  syntax: string;
}

const languages: Language[] = [
  { name: 'JavaScript', syntax: 'javascript' },
  { name: 'Python', syntax: 'python' },
  { name: 'HTML', syntax: 'html' }
];

const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
  };

  return (
    <select value={selectedLanguage.name} onChange={(e) => handleLanguageChange(languages.find((lang) => lang.name === e.target.value))}>
      {languages.map((language) => (
        <option key={language.name} value={language.name}>{language.name}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;