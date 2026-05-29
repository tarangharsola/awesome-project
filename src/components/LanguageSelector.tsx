{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    onChange(language);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Select Language</button>
      {isOpen && (
        <ul>
          {languages.map((language) => (
            <li key={language}>
              <button onClick={() => handleLanguageChange(language)}>
                {language}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return LanguageSelector;
}
export default LanguageSelector;