{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelector = ({ languages, selectedLanguage, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language: string) => {
    onSelect(language);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedLanguage}
      </button>
      {isOpen && (
        <ul>
          {languages.map((language) => (
            <li key={language} onClick={() => handleSelect(language)}>
              {language}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return LanguageSelector;
}
export default LanguageSelector;