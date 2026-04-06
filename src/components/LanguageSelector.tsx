{"import React from 'react';
import { useState } from 'react';

interface Props {
  languages: string[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ languages, selectedLanguage, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language: string) => {
    onChange(language);
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

  return LanguageSelector;
}

export default LanguageSelector;