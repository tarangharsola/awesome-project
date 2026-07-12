{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector = ({ languages, selectedLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    onLanguageChange(language);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Select Language</button>
      {isOpen && (
        <div>
          {languages.map((language) => (
            <button key={language} onClick={() => handleLanguageChange(language)}>
              {language}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return LanguageSelector;
}
export default LanguageSelector;