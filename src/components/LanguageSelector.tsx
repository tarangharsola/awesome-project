{"import React from 'react';
import { useState } from 'react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelector = ({ languages, selectedLanguage, onSelect }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (language: string) => {
    onSelect(language);
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Select Language</button>
      {open && (
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