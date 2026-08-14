{"import React from 'react';
import { useLanguage } from '../utils/useLanguage';

interface LanguageSelectorProps {
  language: string;
  onChange: (language: string) => void;
}

const LanguageSelector = ({ language, onChange }: LanguageSelectorProps) => {
  const { languages } = useLanguage();
  return (
    <select value={language} onChange={(e) => onChange(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;