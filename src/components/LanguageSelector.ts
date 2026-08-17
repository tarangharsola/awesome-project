{"import React from 'react';
import { useState } from 'react';

interface Language {
  id: string;
  name: string;
}

interface Props {
  languages: Language[];
  selectedLanguage: Language;
  onChange: (language: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ languages, selectedLanguage, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language: Language) => {
    onChange(language);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Select Language</button>
      {isOpen && (
        <div>
          {languages.map((language) => (
            <button key={language.id} onClick={() => handleSelect(language)}>
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return LanguageSelector;
}

export default LanguageSelector;