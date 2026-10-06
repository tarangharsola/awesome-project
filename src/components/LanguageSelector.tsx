import React from 'react';
import { Language } from '../types/editor';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onChange: (lang: Language) => void;
}

const languages: { label: string; value: Language }[] = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'HTML', value: 'html' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onChange }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as Language;
    onChange(selected);
  };

  return (
    <select value={currentLanguage} onChange={handleSelect} className="language-selector">
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
