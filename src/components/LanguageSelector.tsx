{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onSelect }) => {
  const [activeLanguage, setActiveLanguage] = useState(selectedLanguage);

  const handleSelect = (language: string) => {
    setActiveLanguage(language);
    onSelect(language);
  };

  return (
    <div>
      {languages.map((language, index) => (
        <button key={index} onClick={() => handleSelect(language)}>
          {language}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;