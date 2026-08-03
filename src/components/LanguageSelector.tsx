{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language: string) => {
    onSelect(language);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Select Language</button>
      {isOpen && (
        <div>
          {languages.map((language) => (
            <button key={language} onClick={() => handleSelect(language)}>
              {language}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return <div>Language: {selectedLanguage}</div>;
};

export default LanguageSelector;