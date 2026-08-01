import React, { useState } from 'react';
import { useLanguage } from '../utils/useLanguage';

interface LanguageSelectorProps {
  languages: string[];
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, onChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { formatCode } = useLanguage(selectedLanguage);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    onChange(language);
  };

  return (
    <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;