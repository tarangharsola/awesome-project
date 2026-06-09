{"import React from 'react';
import { useLanguage } from '../utils/useLanguage';

interface Props {
  languages: string[]
}

const LanguageSelector: React.FC<Props> = ({ languages }) => {
  const { selectedLanguage, handleLanguageChange } = useLanguage(languages);
  return (
    <select value={selectedLanguage} onChange={handleLanguageChange}>
      {languages.map((language) => (
        <option key={language} value={language}>{language}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;