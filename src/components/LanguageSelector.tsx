{"import React from 'react';
import { useLanguage } from '../utils/useLanguage';

const LanguageSelector = () => {
  const { languages, selectedLanguage, onChange } = useLanguage();

  return (
    <select value={selectedLanguage} onChange={onChange}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
};

export default LanguageSelector;