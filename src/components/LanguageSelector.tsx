{"import React from 'react';
import { useLanguage } from './useLanguage';

const LanguageSelector = () => {
  const { languages, selectedLanguage, onChangeLanguage } = useLanguage();
  return (
    <select value={selectedLanguage} onChange={onChangeLanguage}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;