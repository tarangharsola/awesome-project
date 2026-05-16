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
      <ul style={{ display: isOpen ? 'block' : 'none' }}>
        {languages.map((language) => (
          <li key={language}>
            <button onClick={() => handleSelect(language)}>
              {language}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return <div>
    <button onClick={() => setIsOpen(true)}>Select Language</button>
    <ul style={{ display: isOpen ? 'block' : 'none' }}>
      {languages.map((language) => (
        <li key={language}>
          <button onClick={() => handleSelect(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  </div>;