{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    onChange(language);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Select Language</button>
      {isOpen && (
        <div>
          {languages.map((language, index) => (
            <button key={index} onClick={() => handleLanguageChange(language)}>
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