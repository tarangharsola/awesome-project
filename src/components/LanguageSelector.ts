{"import React from 'react';
import { useState } from 'react';

interface Language {
  name: string;
  syntax: string;
}

interface Props {
  languages: Language[];
  selectedLanguage: Language;
  onSelect: (language: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ languages, selectedLanguage, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language: Language) => {
    onSelect(language);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedLanguage.name}
      </button>
      {isOpen && (
        <ul>
          {languages.map((language) => (
            <li key={language.name} onClick={() => handleSelect(language)}>
              {language.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return LanguageSelector;
}

export default LanguageSelector;