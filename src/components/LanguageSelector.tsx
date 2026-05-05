{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onSelect,
}) => {
  const [selected, setSelected] = useState(selectedLanguage);

  const handleSelect = (language: string) => {
    onSelect(language);
    setSelected(language);
  };

  return (
    <div>
      {languages.map((language) => (
        <button key={language} onClick={() => handleSelect(language)}>
          {language}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;