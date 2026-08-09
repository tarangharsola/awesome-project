{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onSelect }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (language: string) => {
    onSelect(language);
    setShowOptions(false);
  };

  return (
    <div>
      <button onClick={() => setShowOptions(!showOptions)}>
        {selectedLanguage}
      </button>
      {showOptions && 
        <ul>
          {languages.map((language) => (
            <li key={language} onClick={() => handleSelect(language)}>
              {language}
            </li>
          ))}
        </ul>
      }
    </div>
  );

  return LanguageSelector;
}

export default LanguageSelector;