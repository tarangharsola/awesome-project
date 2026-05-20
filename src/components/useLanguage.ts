{"import React from 'react';
import { useState } from 'react';

interface Language {
  name: string;
  syntax: string;
}

interface LanguageProps {
  languages: Language[];
  selectedLanguage: Language;
  onSelect: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageProps> = ({ languages, selectedLanguage, onSelect }) => {
  const [activeLanguage, setActiveLanguage] = useState(selectedLanguage);

  const handleSelect = (language: Language) => {
    setActiveLanguage(language);
    onSelect(language);
  };

  return (
    <div>
      <h2>Language:</h2>
      <ul>
        {languages.map((language) => (
          <li key={language.name}>
            <button onClick={() => handleSelect(language)}>
              {language.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return LanguageSelector;
}

export default LanguageSelector;