{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (language: string) => {
    onSelect(language);
    setShowDropdown(false);
  };

  return (
    <div>
      <button onClick={() => setShowDropdown(!showDropdown)}>
        {selectedLanguage}
      </button>
      {showDropdown && (
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