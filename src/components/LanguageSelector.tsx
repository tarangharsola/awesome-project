{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState(selectedLanguage);

  const handleLanguageChange = (language: string) => {
    onChange(language);
    setCurrentLanguage(language);
  };

  return (
    <div>
      <select value={currentLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
        {languages.map((language) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;