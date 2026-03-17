{"import React from 'react';
import { useState, useEffect } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onChange }) => {
  const [selected, setSelected] = useState(selectedLanguage);

  useEffect(() => {
    setSelected(selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageChange = (language: string) => {
    onChange(language);
    setSelected(language);
  };

  return (
    <div>
      {languages.map((language, index) => (
        <button key={index} onClick={() => handleLanguageChange(language)}>
          {language}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;