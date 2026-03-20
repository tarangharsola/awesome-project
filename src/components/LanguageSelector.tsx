{"import React from 'react';
import { useLanguage } from './useLanguage';

interface LanguageSelectorProps {
  language: string;
}

const LanguageSelector = ({ language }: LanguageSelectorProps) => {
  const { languages, selectLanguage } = useLanguage();
  return (
    <select value={language} onChange={(e) => selectLanguage(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;