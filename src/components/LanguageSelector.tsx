import React from 'react';
import { Language } from '../types/editor';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages: Language[] = ['javascript', 'python', 'html'];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as Language;
    onLanguageChange(selected);
  };

  return (
    <select value={currentLanguage} onChange={handleChange} className="language-selector">
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
