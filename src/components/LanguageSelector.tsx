{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onChange }) => {
  const [selected, setSelected] = useState(selectedLanguage);

  const handleSelect = (language: string) => {
    onChange(language);
    setSelected(language);
  };

  return (
    <div>
      {languages.map((language, index) => (
        <button key={index} onClick={() => handleSelect(language)}>
          {language}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;