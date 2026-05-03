import React, { useState } from 'react';
import { useLanguage } from '../utils/useLanguage';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const handleSelect = (language: string) => {
    onChange(language);
    setIsOpen(false);
  };

  return (
    <div className='language-selector'>
      <button onClick={() => setIsOpen(!isOpen)}>
        {selectedLanguage}
      </button>
      {isOpen && (
        <ul>
          {languages.map((lang) => (
            <li key={lang} onClick={() => handleSelect(lang)}>
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSelector;